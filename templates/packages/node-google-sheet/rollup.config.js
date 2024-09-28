const rollupPluginNode = require('rollup-plugin-node');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const path = require('path');

module.exports = {
	input: 'src/index.js',
	output: [
		{
			dir: 'libs/cjs',
			format: 'cjs',
			sourcemap: true,
			exports: 'named',
		},
		{
			dir: 'libs/esm',
			format: 'esm',
			sourcemap: true,
		}
	],
	plugins: [
		resolve(),
		commonjs(),
		terser(),
		rollupPluginNode(),
	],
	external: [
		'googleapis',
		path.resolve('node_modules/**')
	],
};
