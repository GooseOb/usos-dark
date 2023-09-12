import { readFile } from 'node:fs/promises'

const define: Record<string, string> = {};

const styleDeclarations = (await readFile('index.ts', 'utf8'))
	.matchAll(/declare\s+const\s+(s[A-Z_]+):\s*string;\s*\/\/\s*(\S+.css)/g);

for (const [, varName, fileName] of styleDeclarations)
	define[varName] = '"' + (await readFile('styles/' + fileName, 'utf8')).replace(/\s+/gs, ' ') + '"';

export default {
	naming: 'index.js',
	define
}