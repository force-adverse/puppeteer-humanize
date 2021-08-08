import factory from "debug"

/**
 * Provide a namespaced debug instance for package.
 * @type {Debugger}
 */
export const debug: factory.Debugger = factory("puppeteer-humanize")
