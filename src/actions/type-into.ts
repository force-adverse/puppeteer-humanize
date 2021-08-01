import { ElementHandle } from "puppeteer"

import { TypeIntoSchema } from "../schemas"
import {
  chance,
  debug,
  detectCharType,
  isCadence,
  keypressDelay,
  rand,
  Timer,
  waitForTimeout
} from "../support"
import { CharacterType, PerformanceTimer, TypeIntoOptions } from "../types"
import { typeMistake } from "./type-mistake"

/**
 * Humanizes text input into a specified element.
 *
 * @param {ElementHandle} element
 * @param {string} text
 * @param {TypeIntoOptions} config
 * @return {Promise<PerformanceTimer>}
 */
export const typeInto = async (
  element: ElementHandle,
  text: string,
  config: TypeIntoOptions = {}
): Promise<PerformanceTimer> => {
  // Validate config and inject defaults.
  const { delays, mistakes } = TypeIntoSchema.parse(config)

  // Start performance timer for logging.
  const timer: PerformanceTimer = new Timer().start()

  // Break input string into individual letters.
  const chars: string[] = [...text]

  // Click element to allow text input.
  // TODO: Add mouse lib to avoid clicking in the dead center of the element.
  await element.hover()
  await waitForTimeout({ min: 100, max: 200 })
  await element.click({ delay: rand({ min: 5, max: 15 }) })
  await waitForTimeout({ min: 200, max: 800 })

  // Type each character in sequence.
  let position: number = 0
  for (const char of chars) {
    const charType: CharacterType | undefined = detectCharType(char)
    // Add potential for mistakes while typing.
    if (charType !== "termination") {
      await typeMistake(element, char, mistakes)
    }

    // Delay slightly before punctuation.
    if (charType === "punctuation") {
      await waitForTimeout({ min: 50, max: 100 })
    }

    // Type the correct character and add post type delay.
    // TODO: Make capital letters use shift key.
    await element.type(char, keypressDelay())
    await waitForTimeout(delays.all)

    // Add longer delay after sentence termination or punctuation.
    if (
      charType &&
      (charType === "punctuation" || charType === "termination") &&
      Object.keys(delays).includes(charType)
    ) {
      await waitForTimeout(delays[charType])
    }

    // Vary longer delays on natural typing cadences.
    if (isCadence(position) && chance(delays.cadence.chance)) {
      await waitForTimeout(delays.cadence)
    }

    // Increment counter for cadence tracking.
    position++
  }

  // Pause a moment after finishing input.
  await waitForTimeout(delays.complete)

  // Stop and return performance timer.
  timer.stop()

  debug(`Typed "${text}" over ${timer.duration()}ms.`)
  return timer
}
