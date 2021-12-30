/**
 *	@author zwubs
 */

import resolve from '@rollup/plugin-node-resolve';

import { terser } from 'rollup-plugin-terser';

export default [

	// Standard
	{
		input: 'src/panic.js',
		output: {
			file: 'build/panic.js',
			name: 'PANIC',
			format: 'umd',
			indent: '\t'
		},
		plugins: [
			resolve()
		]
	},

	// Minified
	{
		input: 'src/panic.js',
		output: {
			file: 'build/panic.min.js',
			name: 'PANIC',
			format: 'umd'
		},
		plugins: [
			resolve(),
			terser()
		]
	}

]
