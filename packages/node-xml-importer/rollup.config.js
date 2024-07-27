const rollupPluginNode = require('rollup-plugin-node')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')
const pkg = require('./package.json')

module.exports = {
	input: './index.js',
	output: [
		{
			dir: 'libs',
			format: 'cjs',
			exports: 'auto' // Add this to ensure exports are handled correctly
		},
	],
	plugins: [
		resolve(),
		commonjs(),
		terser(),
		rollupPluginNode()
	]
};