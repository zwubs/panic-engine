import { z } from 'zod'
import { ArmatureSchema } from './armature.schema'
import { CollisionSchema } from './collision.schema'
import { TilesetSchema } from './tileset.schema'

export const EntitySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    version: z.string(),
    texture: z.string().url(),
    tileset: TilesetSchema,
    armature: ArmatureSchema,
    collision: CollisionSchema
})
