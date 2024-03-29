import config from "@/api/config"
import merge from "deepmerge"
import { writeFile } from "node:fs/promises"

export const SCOPES = {
  DEBUG: "debug",
  INFO: "info",
  ERROR: "error",
}
const createLogger =
  (scope, defaultData = {}) =>
  async (data) => {
    const logPath = config.logger.paths[scope]

    if (!logPath) {
      throw new Error(`No such logger scope: \`${scope}\``)
    }

    const sanitizedData = merge(defaultData, data)

    // eslint-disable-next-line no-console
    console[scope](sanitizedData)
    await writeFile(`logs/${logPath}`, `${JSON.stringify(sanitizedData)}\n`, {
      encoding: "utf-8",
      flag: "a+",
    })
  }
export const logError = createLogger(SCOPES.ERROR)

export default createLogger
