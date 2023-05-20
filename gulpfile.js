import gulp from 'gulp';
import { readFile } from 'fs/promises';
import path from 'path';
import { inlineAsyncPlugin, inlinePlugin, replaceAsync } from './gulp/utils.js';
import tsProject from './gulp/tsProject.js';

let header;
const updateHeader = async (done) => {
	header = await readFile('header.txt', 'utf-8');
	done?.();
};
await updateHeader();

const processText = (text) => `\n(function(){\n${text
	.replace(/ {4}/g, '\t')
}\n})();`.replace(/^/, header);

const getStyles = (name) => readFile(path.resolve('styles', name), 'utf-8');
const importStyles = (text) => replaceAsync(text,
	/declare\s+(const s[A-Z_]+):\s*string;\s*\/\/\s*(\S+.css)/g,
	async ($0, $1, $2) => $1 + ' = `' + (await getStyles($2)) + '`;'
);

export const build = () => tsProject.src()
	.pipe(inlineAsyncPlugin(importStyles))
	.pipe(tsProject()).js
	.pipe(inlinePlugin(processText))
	.pipe(gulp.dest('.'));

export const watch = () => {
	build();
	gulp.watch('header.txt', gulp.series(updateHeader, build))
	gulp.watch('index.ts', build);
	gulp.watch('styles/*.css', build);
};

export default watch;