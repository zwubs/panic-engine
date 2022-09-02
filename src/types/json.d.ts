import { z } from "zod"
import * as Schema from "../schemas/schemas"
import { Types } from "./types"

export namespace JSON {

    export type Tileset = { [group: string]: TileGroup }
    export type TileGroup = Record<Types.Tools.Directions, Tile>
    export type Tile = {
        x: number, y: number,
        w: number, h: number,
        t: TileTransform
    }
    type TileTransform = {
        flip: { x: boolean, y: boolean },
        translate: { x: number, y: number },
        rotate: number
    }

    type Box = {
        size: [number, number, number],
        offset: [number, number, number]
        rotation: [number, number, number]
    }

    export type CollisionBox = Box
    export type Collision = {
        boxes: Record<string, CollisionBox>
    }

    export type UVBox = Box & {
        faces: string
    }
    export type Bone = {
        cubes: UVBox[]
    }
    export type Armature = Record<string, Bone>


    export type Entity = {
        id: string,
        name: string,
        version: string,
        texture: string,
        tileset: Tileset,
        armature: Armature,
        collision: Collision
    }
}