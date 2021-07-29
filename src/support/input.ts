import { DelayConfig } from "../types"
import { chance, rand, waitForTimeout } from "./utils"

/**
 * Selects a random character for spelling mistakes based on the true character.
 *
 * @param {string} char
 * @return {string}
 */

export const getRandomChar = (char: string): string => {
  const numeric: string[] = [..."0123456789"]
  const alpha: string[] = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  ]

  return alpha.includes(char)
    ? alpha[rand({ min: 0, max: alpha.length })]
    : numeric[rand({ min: 0, max: numeric.length })]
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

/**
 * Resolves a common delay pattern used by input functions based on user config.
 *
 * @param {boolean} isValid
 * @param {DelayConfig} delay
 * @return {Promise<void>}
 */
export const resolveDelay = async (
  isValid: boolean,
  delay: DelayConfig
): Promise<void> => {
  if (isValid && chance(delay.chance)) {
    await waitForTimeout(delay)
  }
}
