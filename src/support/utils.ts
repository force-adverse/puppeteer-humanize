import MersenneTwister from "mersenne-twister"

import { Range } from "../types"
import { InvalidRangeError } from "./exceptions"

/**
 * Provides a MersenneTwister pseudo-random generator.
 * @type {MersenneTwister}
 */
const generator: MersenneTwister = new MersenneTwister()

/**
 * Simple random number generator using a Mersenne Twister.
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const rand = ({ min, max }: Range): number => {
  if (min > max) {
    throw new InvalidRangeError({ min, max })
  }
  return Math.floor(generator.random() * (max - min + 1) + min)
}

/**
 * Simple random delay function.
 * Uses Puppeteer naming convention for consistency.
 *
 * @param {number} min
 * @param {number} max
 * @return {Promise<void>}
 */
export const waitForTimeout = async ({ min, max }: Range): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(
      () => {
        resolve()
      },
      max ? rand({ min, max }) : min
    )
  })

/**
 * Simple dice roll function that accepts a probability threshold.
 *
 * @param {number} probability
 * @return {boolean}
 */
export const chance = (probability: number = 50): boolean =>
  rand({ min: 0, max: 100 }) < probability
