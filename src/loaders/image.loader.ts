/**
 *	@author zwubs
 */

export namespace ImageLoader {

	export const load = async function (url: string): Promise<HTMLImageElement> {

		return await new Promise(resolve => {

			let image = new Image();
			image.addEventListener('load', () => resolve(image));
			image.src = url;

		});

	}

}
