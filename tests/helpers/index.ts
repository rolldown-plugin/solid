import { describe, expect, it, spyOn } from "bun:test";

import { resolve } from "node:path";
import solidPlugin from "@rolldown-plugin/solid";
import { build } from "rolldown";

const testDir = resolve(import.meta.dir, "../fixtures");

interface FixtureOptions {
  platform?: "browser" | "node";
  plugin?: Parameters<typeof solidPlugin>[0];
  skip?: boolean;
}

spyOn(console, "log").mockImplementation(() => {});
spyOn(console, "warn").mockImplementation(() => {});

export function createFixtureTest(
  name: string,
  fixture: string,
  options?: FixtureOptions,
) {
  if (!options?.skip) {
    describe("rolldown-plugin-solid", async () => {
      const distResult = await build({
        platform: options?.platform ?? "browser",
        input: resolve(testDir, fixture),
        plugins: [solidPlugin(options?.plugin)],
        external: ["solid-js", "@solidjs/web"],
        output: { format: "esm" },
        write: false,
        experimental: { attachDebugInfo: "none" },
      });

      const distCode = distResult.output[0].code;

      it(`should transform ${name}`, async () => {
        expect(distCode).toMatchSnapshot();
      });
    });
  }
}
