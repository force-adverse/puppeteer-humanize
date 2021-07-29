import { z } from "zod"

import { DelaySchema, TypeIntoSchema } from "../schemas"

// Full Schemas

export type DelayConfig = z.infer<typeof DelaySchema>
export type TypeIntoConfig = z.infer<typeof TypeIntoSchema>

// Partials
const PartialTypeIntoSchema = TypeIntoSchema.deepPartial()
export type PartialTypeIntoConfig = z.input<typeof PartialTypeIntoSchema>
