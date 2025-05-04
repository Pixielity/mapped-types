/**
 * @class Logger
 * @description A simple logger class for logging messages with different log levels.
 * This class provides methods for logging messages with different severity levels
 * and includes the context (module name) in the log output.
 */
export class Logger {
  /**
   * Creates a new Logger instance with the specified context.
   * @param context The context (usually module name) to include in log messages
   */
  constructor(private readonly context: string) {}

  /**
   * Logs an error message.
   * @param message The message to log
   * @param trace Optional stack trace or error object
   */
  error(message: any, trace?: string | Error): void {
    const timestamp = new Date().toISOString()
    const formattedMessage = `[${timestamp}] [ERROR] [${this.context}] ${message}`

    console.error(formattedMessage)

    if (trace) {
      if (trace instanceof Error) {
        console.error(trace.stack)
      } else {
        console.error(trace)
      }
    }
  }

  /**
   * Logs a warning message.
   * @param message The message to log
   */
  warn(message: any): void {
    const timestamp = new Date().toISOString()
    console.warn(`[${timestamp}] [WARN] [${this.context}] ${message}`)
  }

  /**
   * Logs an informational message.
   * @param message The message to log
   */
  info(message: any): void {
    const timestamp = new Date().toISOString()
    console.info(`[${timestamp}] [INFO] [${this.context}] ${message}`)
  }

  /**
   * Logs a debug message.
   * @param message The message to log
   */
  debug(message: any): void {
    const timestamp = new Date().toISOString()
    console.debug(`[${timestamp}] [DEBUG] [${this.context}] ${message}`)
  }

  /**
   * Logs a verbose message.
   * @param message The message to log
   */
  verbose(message: any): void {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] [VERBOSE] [${this.context}] ${message}`)
  }
}
