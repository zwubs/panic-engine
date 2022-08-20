/**
 *	@author zwubs
 */

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser';

export default [

	// Standard
	{
		input: 'src/panic.ts',
		external: ['three'],
		output: {
			file: 'build/panic.js',
			name: 'PANIC',
			globals: { three: 'THREE' },
			format: 'amd',
			indent: '\t'
		},
		plugins: [
			resolve(),
			typescript()
		]
	},

	// Module
	{
		input: 'src/panic.ts',
		external: ['three'],
		output: {
			file: 'build/panic.module.js',
			name: 'PANIC',
			globals: { three: 'THREE' },
			format: 'esm',
			indent: '\t'
		},
		plugins: [
			resolve(),
			typescript()
		]
	},

	// Minified
	{
		input: 'src/panic.ts',
		external: ['three'],
		output: {
			file: 'build/panic.min.js',
			name: 'PANIC',
			globals: { three: 'THREE' },
			format: 'amd'
		},
		plugins: [
			resolve(),
			typescript(),
			terser()
		]
	}

]
