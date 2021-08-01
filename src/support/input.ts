import {
  KEY_PRESS_MAX_DELAY,
  KEY_PRESS_MIN_DELAY,
  PROXIMATE_CHARS
} from "../constants"
import { KeypressDelay } from "../types/input"
import { charTypes, isAlpha, isNumeric } from "./characters"
import { rand } from "./utils"

/**
 * Selects a random alphanumeric character based on the source character type.
 *
 * @param {string} char
 * @return {string}
 */
export const getRandomChar = (char: string): string => {
  const { alpha, numeric } = charTypes
  return alpha.includes(char)
    ? alpha[rand({ min: 0, max: alpha.length })]
    : numeric[rand({ min: 0, max: numeric.length })]
}

/**
 * Selects a random character proximate to the source character.
 *
 * @param {string} char
 * @return {string | undefined}
 */
export const getProximateChar = (char: string): string | undefined => {
  if (isAlpha(char) || isNumeric(char)) {
    const chars: string[] | undefined = PROXIMATE_CHARS[char.toUpperCase()]
    if (chars?.length) {
      return chars[rand({ min: 0, max: chars.length })]
    }
  }
  return undefined
}

/**
 * Determines if a character in a sequence falls on a defined natural typing cadence.
 *
 * @param {number} position
 * @return {boolean}
 */
export const isCadence = (position: number): boolean => {
  const cadences: number[] = [6, 10]
  for (const cadence of cadences) {
    if (position % cadence === 0) {
      return true
    }
  }
  return false
}

export const keypressDelay = (): KeypressDelay => {
  return { delay: rand({ min: KEY_PRESS_MIN_DELAY, max: KEY_PRESS_MAX_DELAY }) }
}
