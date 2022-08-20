/**
 *	@author zwubs
 */

import typescript from '@rollup/plugin-typescript'

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
			typescript()
		]
	},

]
