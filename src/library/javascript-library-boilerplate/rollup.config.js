import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import css from "rollup-plugin-import-css";
import { uglify } from 'rollup-plugin-uglify';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
    input: 'src/index.js',
    output: {
        file: pkg.main,
        format: 'umd',
        name: 'MyLibrary',
    },
    plugins: [
        json(),
        resolve(),
        commonjs(),
        terser(),
        css(),
        uglify()
    ],
    external: Object.keys(pkg.peerDependencies),
};
