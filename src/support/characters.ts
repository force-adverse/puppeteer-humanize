import * as CHARS from "../constants/characters"
import * as REGEX from "../constants/regex"
import { CharacterType } from "../types"

/**
 * Lookup object of character types as arrays.
 * @type {Record<CharacterType, string[]>}
 */
export const charTypes: Record<CharacterType, string[]> = {
  alpha: CHARS.ALPHA_CHARS,
  numeric: CHARS.NUMERIC_CHARS,
  whitespace: CHARS.WHITESPACE_CHARS,
  punctuation: CHARS.PUNCTUATION_CHARS,
  termination: CHARS.TERMINATION_CHARS
}

/**
 * Determines if a specified character is whitespace.
 *
 * @param {string} input
 * @return {boolean}
 */
export const isWhitespace = (input: string): boolean =>
  !!input.match(REGEX.WHITESPACE_REGEX)

/**
 * Determines if a specified character is punctuation.
 *
 * @param {string} input
 * @return {boolean}
 */
export const isPunctuation = (input: string): boolean =>
  !!input.match(REGEX.PUNCTUATION_REGEX)

/**
 * Determines if a specified character is a termination character.
 *
 * @param {string} input
 * @return {boolean}
 */
export const isTermination = (input: string): boolean =>
  !!input.match(REGEX.TERMINATION_REGEX)

/**
 * Determines if a specified character is an alphabet character.
 * Tests for both uppercase and lowercase.
 *
 * @param {string} input
 * @return {boolean}
 */
export const isAlpha = (input: string): boolean =>
  !!input.match(REGEX.ALPHA_REGEX)

/**
 * Determines if a specified character is numeric.
 *
 * @param {string} input
 * @return {boolean}
 */
export const isNumeric = (input: string): boolean =>
  !!input.match(REGEX.NUMERIC_REGEX)

/**
 * Determines if a specified character is lower case.
 *
 * @param {string} input
 * @return {boolean}
 */
export const isLowerCase = (input: string): boolean =>
  isAlpha(input) &&
  input.toLowerCase() === input &&
  input.toUpperCase() !== input

/**
 * Determines if a specified character is upper case.
 *
 * @param {string} input
 * @return {boolean}
 */
export const isUpperCase = (input: string): boolean =>
  isAlpha(input) &&
  input.toUpperCase() === input &&
  input.toLowerCase() !== input

/**
 * Provides a typed map of each character type test function.
 *
 * @type {Map<string, (input: string) => boolean>}
 */
export const charTypeTests: Map<CharacterType, (input: string) => boolean> =
  new Map([
    ["punctuation", isPunctuation],
    ["termination", isTermination],
    ["whitespace", isWhitespace],
    ["alpha", isAlpha],
    ["numeric", isNumeric]
  ])

/**
 * Detects a character type of a provided character.
 *
 * @param {string} char
 * @return {CharacterType | undefined}
 */
export const detectCharType = (char: string): CharacterType | undefined => {
  for (const [charType, test] of charTypeTests.entries()) {
    if (test(char)) {
      return charType
    }
  }

  return undefined
}
