import { readFile } from "node:fs/promises";

const define: Record<string, string> = {};

const styleDeclarations = (await readFile("index.ts", "utf8"))
  .match(/declare const(.+?);/s)![0]
  .matchAll(/(s[A-Z_]+)\s*:\s*"(\S+\.css)"/g);

for (const [, varName, fileName] of styleDeclarations)
  define[varName] =
    `"${(await readFile("styles/" + fileName, "utf8")).replace(/\s+/gs, " ")}"`;

export default {
  naming: "dist/index.js",
  define,
};
