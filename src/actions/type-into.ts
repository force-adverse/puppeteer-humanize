import { ElementHandle } from "puppeteer"

import { TypeIntoSchema } from "../schemas"
import {
  chance,
  debug,
  getRandomChar,
  isCadence,
  rand,
  resolveDelay,
  Timer,
  waitForTimeout
} from "../support"
import { PartialTypeIntoConfig, PerformanceTimer } from "../types"

/**
 * Humanizes text input into a specified element.
 *
 * @param {ElementHandle} element
 * @param {string} text
 * @param {PartialTypeIntoConfig} config
 * @return {Promise<PerformanceTimer>}
 */
export const typeInto = async (
  element: ElementHandle,
  text: string,
  config: PartialTypeIntoConfig = {}
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
    // Parse character type.
    const isSpace: boolean = [..." "].includes(char)
    const isTermination: boolean = [...".,?!"].includes(char)
    const isPunctuation: boolean = [..."@#$%^&*()-+_=/[]{}:;|~<>\"'"].includes(
      char
    )
    // Add potential for mistakes while typing.
    if (!isTermination && chance(mistakes.chance)) {
      const mistake: string = getRandomChar(char)
      await element.type(mistake, { delay: rand({ min: 5, max: 15 }) })
      await waitForTimeout(mistakes.delay)
      await element.press("Backspace")
      await waitForTimeout({
        min: mistakes.delay.min * 2,
        max: mistakes.delay.max * 2
      })
    }

    // Delay slightly before punctuation.
    if (isPunctuation) {
      await waitForTimeout({ min: 50, max: 100 })
    }

    // Type the correct character.
    // TODO: Make capital letters use shift key.
    await element.type(char)
    await waitForTimeout(delays.all)

    // Add various delays after sentence termination or punctuation.
    await resolveDelay(isSpace, delays.space)
    await resolveDelay(isTermination, delays.termination)
    await resolveDelay(isPunctuation, delays.punctuation)
    // Vary longer delays on natural typing cadences.
    await resolveDelay(isCadence(position), delays.cadence)

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
