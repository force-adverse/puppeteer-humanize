import { z } from "zod"

import * as Schemas from "../schemas"

// Text Schemas
export type CharacterType = z.infer<typeof Schemas.CharacterTypeSchema>

// Config Schemas
export type Delay = z.infer<typeof Schemas.DelaySchema>
export type TypeMistake = z.infer<typeof Schemas.TypeMistakeSchema>
export type TypeInto = z.infer<typeof Schemas.TypeIntoSchema>

// Partials
const TypeMistakeOptionsSchema = Schemas.TypeMistakeSchema.deepPartial()
const TypeIntoOptionsSchema = Schemas.TypeIntoSchema.deepPartial()
export type TypeMistakeOptions = z.input<typeof TypeMistakeOptionsSchema>
export type TypeIntoOptions = z.input<typeof TypeIntoOptionsSchema>
