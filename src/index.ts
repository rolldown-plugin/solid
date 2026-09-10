import type { TransformOptions } from "@solidjs/compiler";
import { transform } from "@solidjs/compiler";
import type { RolldownPlugin } from "rolldown";

type SolidOptions = Omit<TransformOptions, "filename">;

export default function solidPlugin(
  options: { solid?: SolidOptions } = {},
): RolldownPlugin {
  return {
    name: "@rolldown-plugin/solid",
    transform: {
      filter: { id: /\.[jt]sx$/ },
      handler(code, id) {
        return transform(code, {
          ...options.solid,
          filename: id,
          generate: options.solid?.generate ?? "dom",
          moduleName: options.solid?.moduleName ?? "@solidjs/web",
        });
      },
    },
  };
}
