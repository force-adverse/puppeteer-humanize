import factory from "debug"

import { Debugger } from "../types"

/**
 * Provide a namespaced debug instance for package.
 * @type {Debugger}
 */
export const debug: Debugger = factory("puppeteer-humanize")
