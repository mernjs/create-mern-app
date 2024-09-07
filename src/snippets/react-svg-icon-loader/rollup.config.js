import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.main, format: 'cjs', exports: 'auto' },
		{ file: pkg.module, format: 'esm', exports: 'auto' },
	],
	plugins: [
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: ['@babel/preset-env', '@babel/preset-react'],
		}),
		resolve(),
		commonjs(),
		terser(),
		css(),
	],
	external: Object.keys(pkg.peerDependencies),
	inlineDynamicImports: true,
};
