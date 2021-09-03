# PANIC Entity Files
Entity File Structure


### Tilesets
Instead of holding individual tiles, tilesets now hold groups of tiles.
This in turn makes it easier to manipulate and change tiles.

###### Original tileset format
This is the original way tileset information was
```json
{
	"base": { "x": 0, "y": 0, "width": 0, "height": 0 },
	"base2": { "x": 0, "y": 0, "width": 0, "height": 0 }
}
```

###### Shorthand properties
"width" and "height" can be shortened respectively to "w" and "h".
```json
{
	"base": { "x": 0, "y": 0, "w": 0, "h": 0 },
	"base2": { "x": 0, "y": 0, "w": 0, "h": 0 }
}
```

###### Tile grouping
Tiles can be pre-grouped in the tileset
```json
{
	"base": {
		"north": { "x": 0, "y": 0, "w": 0, "h": 0 },
		"south": { "x": 0, "y": 0, "w": 0, "h": 0 }
	}
}
```
To use these tile groupings they can be used in the model definition as so.
```json
{
	"size": [ 8, 8, 8],
	"faces": "base"
}
```

###### Defaults in tile group
Predefine shared attribute values between tiles
```json
{
	"base": {
		"default": { "w": 0, "h": 0 },
		"north": { "x": 0, "y": 0 }
	}
}
```

###### Copying tile groups
Create a copy of an already existing tile group
```json
{
	"copyOfBase": {
		"clone": "base"
	}
}
```

###### Transforming tiles
```json
{
	"base": {
		"default": { "x": 0, "y": 0, "w": 0, "h": 0 },
		"north": { "transform": { "flipX": true } }
	}
}
```
```json
{
	"base": { "x": 0, "y": 0, "w": 0, "h": 0, "transform": { "flipX": true } }
}
```

Transform can be shortened too.

```json
{
	"north": { "x": 0, "w": 10, "t": { "flipX": true } }
}
```

Types of transformations
* `flipX` : Flip the UV horizontally (Over Y-Axis) (Ex. True/False)
* `flipY` : Flip the UV vertically (Over X-Axis) (Ex. True/False)
* `rotate` : Using values from 0-4 rotates the UV from 0-360degs
* `offset` : Using an array offset the X & Y values (Ex. [2,2])
* `scale` : Using an array scale the Width & Height values (Ex. [2,2])

###### Transforming tile groups
```json
{
	"base": {
		"transform": { "flipX": true }
	}
}
```

###### Invalid Names
This is a list of names not to be used for tiles or tile groups
* `default`
* `north`
* `south`
* `east`
* `west`
* `up`
* `down`
* `transform`
* `t`
* `x`
* `y`
* `width`
* `w`
* `height`
* `h`
