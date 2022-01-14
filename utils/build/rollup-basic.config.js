/**
 *	@author zwubs
 */

import resolve from '@rollup/plugin-node-resolve';

import { terser } from 'rollup-plugin-terser';

export default [

	// Standard
	{
		input: 'src/panic.js',
		external: ['three'],
		output: {
			file: 'build/panic.js',
			name: 'PANIC',
			globals: { three: 'THREE' },
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
		external: ['three'],
		output: {
			file: 'build/panic.min.js',
			name: 'PANIC',
			globals: { three: 'THREE' },
			format: 'umd'
		},
		plugins: [
			resolve(),
			terser()
		]
	}

]
