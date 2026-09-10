import { createFixtureTest } from "./helpers";

createFixtureTest("templates and event delegation", "templates.tsx", {
  skip: true,
});

createFixtureTest("templates with SSR", "templates.tsx", {
  platform: "node",
  plugin: { solid: { generate: "ssr" } },
  skip: true,
});

createFixtureTest("templates with universal", "templates.tsx", {
  plugin: {
    solid: { generate: "universal", moduleName: "#universal-mode-renderer" },
  },
  skip: true,
});

createFixtureTest("templates with universal and hydratable", "templates.tsx", {
  plugin: {
    solid: {
      generate: "universal",
      moduleName: "#universal-mode-renderer",
      hydratable: true,
    },
  },
  skip: true,
});

createFixtureTest("templates with disabled delegation", "templates.tsx", {
  plugin: { solid: { delegateEvents: false } },
  skip: true,
});

createFixtureTest("templates with hydratable SSR", "templates.tsx", {
  platform: "node",
  plugin: { solid: { generate: "ssr", hydratable: true } },
  skip: true,
});
