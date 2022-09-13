/**
 *	@author zwubs
 */

 import resolve from '@rollup/plugin-node-resolve';
 import typescript from '@rollup/plugin-typescript'

export default [
	{
		input: 'src/panic.ts',
		external: ['three', 'zod'],
		treeshake: true,
		output: {
			file: 'build/panic.js',
			name: 'PANIC',
			globals: {
				three: 'THREE',
				zod: 'Zod'
			},
			format: 'iife',
			indent: '\t'
		},
		plugins: [
			typescript(),
			resolve({
				extensions: ['.ts', '.js', '.json']
			})
		]
	}
]
