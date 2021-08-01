import { ElementHandle } from "puppeteer"

import { TypeMistakeSchema } from "../schemas"
import {
  chance,
  getProximateChar,
  keypressDelay,
  waitForTimeout
} from "../support"
import { TypeMistake, TypeMistakeOptions } from "../types"

/**
 * Types and deletes a mistake based on a source character.
 * Locates a proximate character based on physical location on an EN format keyboard.
 *
 * @todo Add support for multilingual keyboard formats and characters.
 * @param {ElementHandle} element
 * @param {string} char
 * @param {TypeMistakeOptions} options
 * @return {Promise<void>}
 */
export const typeMistake = async (
  element: ElementHandle,
  char: string,
  options: TypeMistakeOptions = {}
): Promise<void> => {
  const opts: TypeMistake = TypeMistakeSchema.parse(options)
  const mistakeChar: string | undefined = getProximateChar(char)
  if (mistakeChar && chance(opts.chance)) {
    await element.type(mistakeChar, keypressDelay())
    await waitForTimeout(opts.delay)
    await element.press("Backspace", keypressDelay())
    await waitForTimeout({
      min: opts.delay.min * 1.5,
      max: opts.delay.max * 2
    })
  }
}
