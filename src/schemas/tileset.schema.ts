import {z} from "zod"

const TileSchema = z.object({
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    t: z
        .object({
            flip: z
                .object({
                    x: z.boolean(),
                    y: z.boolean()
                })
                .optional(),
            translate: z
                .object({
                    x: z.number(),
                    y: z.number()
                })
                .optional(),
            rotate: z.number().min(0).max(3).optional()
        })
        .optional()
})

export const TilesetSchema = z.record(
    z.object({
        north: TileSchema,
        south: TileSchema,
        east: TileSchema,
        west: TileSchema,
        up: TileSchema,
        down: TileSchema
    })
)
