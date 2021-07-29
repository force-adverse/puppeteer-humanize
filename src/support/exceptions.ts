import { Range } from "../types"

/**
 * Throws when an invalid range is provided to a utility function.
 *
 * @class InvalidRangeError
 * @extends Error
 */
export class InvalidRangeError extends Error {
  public constructor({ min, max }: Range) {
    super(
      `Encountered an invalid range. Minimum value "${min}" cannot be greater than maximum value "${max}".`
    )
  }
}
