/**
 *	@author zwubs
 */

import { FileLoader as FILELOADER } from 'three'

export namespace FileLoader {

	const loader = new FILELOADER();

	export const load = async function (url: string): Promise<string> {

		// Get File Information
		var baseURL = url.substring(0, url.lastIndexOf("/") + 1);
		var filename = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
		var fileextension = url.substring(url.lastIndexOf('.') + 1);

		const buffer = await new Promise(resolve => { loader.load(url, resolve); });
		return buffer as string;

	}

}
