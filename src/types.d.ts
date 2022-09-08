import { Tools } from '../tools'
import { IUniform } from "three";

declare namespace Types {

    export namespace Tools {

        export type Directions = typeof Tools.Directions[number]
    
        export type Uniforms = { [uniform: string]: IUniform<any> }
    
    }

    export type Shader = {
        uniforms: { [uniform: string]: IUniform<any> };
        vertex: string,
        fragment: string
    }

    export namespace JSON {

        export type Tileset = { [group: string]: TileGroup }
        export type TileGroup = Record<Tools.Directions, Tile>
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

}