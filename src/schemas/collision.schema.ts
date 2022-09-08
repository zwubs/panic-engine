import { z } from 'zod'

export const CollisionSchema = z.object({
    boxes: z.record(
        z.object({
            size: z.array(z.number()).length(3),
            offset: z.array(z.number()).length(3),
            rotation: z.array(z.number().min(0).max(360)).length(3),
        })
    )
})

