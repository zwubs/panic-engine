/**
 *	@author zwubs
 */

import resolve from '@rollup/plugin-node-resolve';

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

]
