const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const replace = require('gulp-replace');
const { readFileSync, promises: { readFile } } = require('fs');
const path = require('path');

const header = readFile('header.txt', 'utf-8');

const getStyle = name => readFileSync(path.resolve('styles', name), 'utf-8');
const styleImportRegex = /declare\s+(const s[A-Z_]+):\s*string;\s*\/\/\s*(\S+.css)/g;
const styleImportReplacer = ($0, $1, $2) => $1 + ' = `' + getStyle($2) + '`;';

const process = async () => tsProject.src()
	.pipe(replace(styleImportRegex, styleImportReplacer))
	.pipe(tsProject()).js
	.pipe(replace(/ {4}/g, '\t'))
	.pipe(replace(/\n\t/g, '\n'))
	.pipe(replace(/^/, await header))
	.pipe(gulp.dest('.'));

exports.default = () => {
	process();
	gulp.watch('index.ts', process);
	gulp.watch('styles/*.css', process);
};