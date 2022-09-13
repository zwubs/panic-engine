/**
 *	@author zwubs
 */

import { FileLoader as FILELOADER } from 'three'

export namespace FileLoader {

	const loader = new FILELOADER();

	export const load = async function (url: string): Promise<string> {

		const buffer = await new Promise(resolve => { loader.load(url, resolve); });
		return buffer as string;

	}

}
