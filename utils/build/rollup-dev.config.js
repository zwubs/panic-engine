/**
 *	@author zwubs
 */

import resolve from '@rollup/plugin-node-resolve';

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

]
