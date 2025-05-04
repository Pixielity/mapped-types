import { Logger } from '../logger'

/**
 * @description Centralized logger instance for the MappedTypes module.
 * Used to log errors and other information during the execution of the module.
 * This logger provides consistent formatting and context for all log messages.
 *
 * @example
 * // Log an error message
 * logger.error('An error occurred while processing metadata');
 *
 * // Log an error with a stack trace
 * try {
 *   // Some code that might throw
 * } catch (err) {
 *   logger.error('Failed to process metadata', err);
 * }
 */
export const logger = new Logger('MappedTypes')
