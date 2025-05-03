/**
 * @class Logger
 * @description A simple logger class for logging messages with different log levels.
 * This class provides methods for logging messages with different severity levels
 * and includes the context (module name) in the log output.
 */
declare class Logger {
  private readonly context
  /**
   * Creates a new Logger instance with the specified context.
   * @param context The context (usually module name) to include in log messages
   */
  constructor(context: string)
  /**
   * Logs an error message.
   * @param message The message to log
   * @param trace Optional stack trace or error object
   */
  error(message: any, trace?: string | Error): void
  /**
   * Logs a warning message.
   * @param message The message to log
   */
  warn(message: any): void
  /**
   * Logs an informational message.
   * @param message The message to log
   */
  info(message: any): void
  /**
   * Logs a debug message.
   * @param message The message to log
   */
  debug(message: any): void
  /**
   * Logs a verbose message.
   * @param message The message to log
   */
  verbose(message: any): void
}

export { Logger }
