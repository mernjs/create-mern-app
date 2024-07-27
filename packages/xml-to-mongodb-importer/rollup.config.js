const rollupPluginNode = require('rollup-plugin-node')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')

module.exports = {
	input: './index.js',
	output: [
		{
			dir: 'libs',
			format: 'cjs'
		},
	],
	plugins: [
		resolve(),
		commonjs(),
		terser(),
		rollupPluginNode()
	]
};