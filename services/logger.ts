import app from "../constants/app"
import { ENV } from "../constants/env"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logger = (message: any) => {
  if (ENV.MODE === app.modes.dev) {
    console.log(message)
  }
}