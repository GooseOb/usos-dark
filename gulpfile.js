const { dest, watch, series } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const { readFile } = require('fs/promises');
const path = require('path');
const through2 = require('through2');

let header;
const updateHeader = async (done) => {
	header = await readFile('header.txt', 'utf-8');
	done?.();
};

const replaceAsync = async (str, regex, replacer) => {
	const promises = [];
	str.replace(regex, (...args) => {
		promises.push(replacer(...args));
		return '';
	});
	const data = await Promise.all(promises);
	return str.replace(regex, () => data.shift());
};

const processText = (text) => `\n(function(){\n${text
	.replace(/ {4}/g, '\t')
}\n})();`.replace(/^/, header);

const getStyle = (name) => readFile(path.resolve('styles', name), 'utf-8');
const importStyles = async (text) => replaceAsync(text,
	/declare\s+(const s[A-Z_]+):\s*string;\s*\/\/\s*(\S+.css)/g,
	async ($0, $1, $2) => $1 + ' = `' + (await getStyle($2)) + '`;'
);

const inlinePluginHelper = (file, done, result) => {
	if (file.isBuffer())
		file.contents = Buffer.from(result);
	done(null, file);
};
const inlinePlugin = (cb) =>
	through2.obj((file, _, done) => {
		inlinePluginHelper(file, done, cb(file.contents.toString()));
	});
const inlineAsyncPlugin = (cb) =>
	through2.obj(async (file, _, done) => {
		inlinePluginHelper(file, done, await cb(file.contents.toString()));
	});

const process = () => tsProject.src()
	.pipe(inlineAsyncPlugin(importStyles))
	.pipe(tsProject()).js
	.pipe(inlinePlugin(processText))
	.pipe(dest('.'));

exports.default = async () => {
	await updateHeader();
	process();
	watch('header.txt', series(updateHeader, process))
	watch('index.ts', process);
	watch('styles/*.css', process);
};