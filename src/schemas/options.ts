import { z } from "zod"

export const DelaySchema = z.object({
  chance: z.number().min(0).max(100).default(100),
  min: z.number(),
  max: z.number()
})

export const TypeMistakeSchema = z.object({
  chance: z.number().default(5),
  delay: DelaySchema.default({
    chance: 100,
    min: 100,
    max: 200
  })
})

export const TypeIntoSchema = z.object({
  mistakes: TypeMistakeSchema.default({}),
  delays: z
    .object({
      all: DelaySchema.default({ chance: 100, min: 50, max: 150 }),
      complete: DelaySchema.default({ chance: 100, min: 500, max: 1000 }),
      space: DelaySchema.default({ chance: 80, min: 10, max: 100 }),
      punctuation: DelaySchema.default({ chance: 70, min: 50, max: 500 }),
      termination: DelaySchema.default({ chance: 95, min: 100, max: 1000 }),
      cadence: DelaySchema.default({ chance: 100, min: 50, max: 500 })
    })
    .default({})
})
