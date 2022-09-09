/**
 *	@author zwubs
 */

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser';

export default [

	{
		input: 'src/panic.ts',
		external: ['three', 'zod'],
		treeshake: true,
		output: [
			{
				file: 'build/panic.js',
				name: 'PANIC',
				globals: {
					three: 'THREE',
					zod: 'Zod'
				},
				format: 'iife',
				indent: '\t'
			},
			{
				file: 'build/panic.module.js',
				name: 'PANIC',
				globals: {
					three: 'THREE',
					zod: 'Zod'
				},
				format: 'esm',
				indent: '\t'
			},
			{
				file: 'build/panic.min.js',
				name: 'PANIC',
				globals: {
					three: 'THREE',
					zod: 'Zod'
				},
				format: 'iife',
				plugins: [terser()]
			},
		],
		plugins: [
			typescript(),
			resolve({
				extensions: ['.ts', '.js', '.json']
			})
		]
	},

]
