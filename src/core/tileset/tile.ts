import { Texture } from "../texture";

class Tile {

	x = 0;
	y = 0;
	w = 0;
	h = 0;
	name = "Undefined";
	pattern: TilePattern;

	constructor(name?: string) {

		this.name = name ?? 'Undefined';

		this.pattern = [0, 1, 2, 1, 0, 3, 2, 3];

	}

	get width() { return this.w; }
	get height() { return this.h; }

	set(x: number, y: number, width: number, height: number) {

		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;

	}

	UV(texture: Texture) {

		let corners = [
			this.x / texture.w,
			(texture.h - this.y) / texture.h,
			(this.x + this.w) / texture.w,
			(texture.h - this.y - this.h) / texture.h
		]

		return [
			corners[this.pattern[0]],
			corners[this.pattern[1]],
			corners[this.pattern[2]],
			corners[this.pattern[3]],
			corners[this.pattern[4]],
			corners[this.pattern[5]],
			corners[this.pattern[6]],
			corners[this.pattern[7]]
		]

	}

	editPattern(a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0) {

		this.pattern = [
			this.pattern[a],
			this.pattern[b],
			this.pattern[c],
			this.pattern[d],
			this.pattern[e],
			this.pattern[f],
			this.pattern[g],
			this.pattern[h]
		];

	}

}

export { Tile };
