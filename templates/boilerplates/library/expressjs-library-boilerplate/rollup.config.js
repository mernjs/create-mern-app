const rollupPluginNode = require('rollup-plugin-node')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')
const pkg = require('./package.json')

module.exports = {
    input: 'src/index.js',
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