import factory from "debug"
import { DebugLogger } from "util"

/**
 * Provide a namespaced debug instance for package.
 * @type {debug.Debugger}
 */
export const debug: DebugLogger = factory("puppeteer-humanize")
