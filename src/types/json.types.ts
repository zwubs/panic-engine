import {z} from "zod"
import * as Schema from "../schemas/schemas"

export type Tileset = z.infer<typeof Schema.Tileset>
export type Entity = z.infer<typeof Schema.Tileset>
export type Armature = z.infer<typeof Schema.Armature>
export type Collision = z.infer<typeof Schema.Collision>
