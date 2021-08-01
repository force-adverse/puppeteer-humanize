import { z } from "zod"

export const CharacterTypeSchema = z.enum([
  "alpha",
  "numeric",
  "punctuation",
  "termination",
  "whitespace"
])
