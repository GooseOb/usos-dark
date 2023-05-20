import through2 from 'through2';

const inlinePluginHelper = (file, done, result) => {
	if (file.isBuffer())
		file.contents = Buffer.from(result);
	done(null, file);
};
export const inlinePlugin = (cb) =>
	through2.obj((file, _, done) => {
		inlinePluginHelper(file, done, cb(file.contents.toString()));
	});
export const inlineAsyncPlugin = (cb) =>
	through2.obj(async (file, _, done) => {
		inlinePluginHelper(file, done, await cb(file.contents.toString()));
	});


export const replaceAsync = async (str, regex, replacer) => {
	if (!regex.global)
		return str.replace(regex, await replacer(...str.match(regex)));

	const promises = [];
	for (const args of str.matchAll(regex))
		promises.push(replacer(...args));

	const data = await Promise.all(promises);
	data.reverse();

	return str.replace(regex, () => data.pop());
};