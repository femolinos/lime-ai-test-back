/* eslint-disable @typescript-eslint/no-explicit-any */

export const logger = {
  info: (message: string, data?: any) => {
    console.log(message, data)
  },
  error: (message: string, data?: any) => {
    console.error(message, data)
  },
  warn: (message: string, data?: any) => {
    console.warn(message, data)
  },
  debug: (message: string, data?: any) => {
    console.debug(message, data)
  },
}
