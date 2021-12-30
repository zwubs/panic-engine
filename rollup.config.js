/**
 *	@author zwubs
 */

import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/panic.js',
	output: {
		file: 'build/panic.js',
		name: 'PANIC',
		format: 'umd',
		indent: '\t'
	},
	plugins: [ resolve() ]
};
