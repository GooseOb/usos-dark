import { readFile } from "node:fs/promises";
import type { BuildConfigs } from "bun-build-userscript";

export const bun: BuildConfigs["bun"] = {
  naming: "dist/index.js",
};

export const userscript: BuildConfigs["userscript"] = {
  entry: "src",
  before: async ({ bun }) => {
    bun.define = {};

    const styleDeclarations = (await readFile("src/index.ts", "utf8"))
      .match(/declare const(.+?);/s)![0]
      .matchAll(/(s[A-Z_]+)\s*:\s*"(\S+\.css)"/g);

    for (const [, varName, fileName] of styleDeclarations)
      bun.define[varName] =
        `"${(await readFile("src/styles/" + fileName, "utf8")).replace(/\s+/gs, " ")}"`;
  },
};
