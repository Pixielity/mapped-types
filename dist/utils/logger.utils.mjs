// src/logger.ts
var Logger = class {
  /**
   * Creates a new Logger instance with the specified context.
   * @param context The context (usually module name) to include in log messages
   */
  constructor(context) {
    this.context = context;
  }
  /**
   * Logs an error message.
   * @param message The message to log
   * @param trace Optional stack trace or error object
   */
  error(message, trace) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const formattedMessage = `[${timestamp}] [ERROR] [${this.context}] ${message}`;
    console.error(formattedMessage);
    if (trace) {
      if (trace instanceof Error) {
        console.error(trace.stack);
      } else {
        console.error(trace);
      }
    }
  }
  /**
   * Logs a warning message.
   * @param message The message to log
   */
  warn(message) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    console.warn(`[${timestamp}] [WARN] [${this.context}] ${message}`);
  }
  /**
   * Logs an informational message.
   * @param message The message to log
   */
  info(message) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    console.info(`[${timestamp}] [INFO] [${this.context}] ${message}`);
  }
  /**
   * Logs a debug message.
   * @param message The message to log
   */
  debug(message) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    console.debug(`[${timestamp}] [DEBUG] [${this.context}] ${message}`);
  }
  /**
   * Logs a verbose message.
   * @param message The message to log
   */
  verbose(message) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`[${timestamp}] [VERBOSE] [${this.context}] ${message}`);
  }
};

// src/utils/logger.utils.ts
var logger = new Logger("MappedTypes");
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { logger };
//# sourceMappingURL=logger.utils.mjs.map
//# sourceMappingURL=logger.utils.mjs.map