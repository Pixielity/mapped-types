'use strict';

require('reflect-metadata');

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

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

// src/utils/inherit-validation-metadata.utils.ts
function inheritValidationMetadata(parentClass, targetClass, isPropertyInherited) {
  if (!isClassValidatorAvailable()) {
    return;
  }
  try {
    const classValidator = __require("class-validator");
    const metadataStorage = classValidator.getMetadataStorage ? classValidator.getMetadataStorage() : classValidator.getFromContainer(classValidator.MetadataStorage);
    const getTargetValidationMetadatasArgs = [parentClass, null, false, false];
    const targetMetadata = metadataStorage.getTargetValidationMetadatas(...getTargetValidationMetadatasArgs);
    return targetMetadata.filter(({ propertyName }) => !isPropertyInherited || isPropertyInherited(propertyName)).map((value) => {
      const originalType = Reflect.getMetadata(
        "design:type",
        parentClass.prototype,
        value.propertyName
      );
      if (originalType) {
        Reflect.defineMetadata(
          "design:type",
          originalType,
          targetClass.prototype,
          value.propertyName
        );
      }
      metadataStorage.addValidationMetadata({
        ...value,
        target: targetClass
      });
      return value.propertyName;
    });
  } catch (err) {
    logger.error(
      `Validation ("class-validator") metadata cannot be inherited for "${parentClass.name}" class.`
    );
    logger.error(err);
  }
}
function isClassValidatorAvailable() {
  try {
    __require("class-validator");
    return true;
  } catch (e) {
    return false;
  }
}
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.inheritValidationMetadata = inheritValidationMetadata;
//# sourceMappingURL=inherit-validation-metadata.utils.js.map
//# sourceMappingURL=inherit-validation-metadata.utils.js.map