/**
 *	@author zwubs
 */

import { Tileset } from "../core/tileset/tileset"
import { TileGroup } from "../core/tileset/tile-group"

import { Debug } from "../debug/"
import { Types } from "../types"
import { TilesetSchema } from "../schemas/tileset.schema"
import { Tools } from "../panic"

export namespace TilesetParser {

    export const parse = (json: Types.JSON.Tileset, id = "Undefined") => {
        let tileset = new Tileset()

        let groups = Object.entries(json)
        TilesetSchema.parse(groups)

        console.groupCollapsed(`Tileset: '${id}'`)

        for (const [name, group] of groups) {
            Debug.log(`'${name}' is a group`)
            const tileGroup = parseGroup(group)
            tileset.addTileGroup(name, tileGroup)
        }

        console.groupEnd()

        return tileset
    }

    const parseGroup = (group: Types.JSON.TileGroup) => {
        let tileGroup = new TileGroup()

        for (const direction of Tools.Directions) {

            const tile = group[direction]

            // Tile Transforms
            if (tile.t) {
                if (tile.t.flip?.x) tileGroup[direction].editPattern(2, 3, 0, 1, 6, 7, 4, 5)
                if (tile.t.flip?.y) tileGroup[direction].editPattern(4, 5, 6, 7, 0, 1, 2, 3)

                if (tile.t?.translate) {
                    if (tile.t.translate.x) tileGroup[direction].x += tile.t.translate.x
                    if (tile.t.translate.y) tileGroup[direction].y += tile.t.translate.y
                }

                if (tile.t?.rotate) {
                    if (tile.t.rotate == 1) tileGroup[direction].editPattern(4, 5, 0, 1, 6, 7, 2, 3)
                    else if (tile.t.rotate == 2) tileGroup[direction].editPattern(6, 7, 4, 5, 2, 3, 0, 1)
                    else if (tile.t.rotate == 3) tileGroup[direction].editPattern(2, 3, 6, 7, 0, 1, 4, 5)
                }
            }
        }
        return tileGroup;
    }
}
