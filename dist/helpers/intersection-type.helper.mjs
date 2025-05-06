import 'reflect-metadata';

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

// src/utils/inherit-property-initializers.utils.ts
function inheritPropertyInitializers(target, sourceClass, isPropertyInherited = (key) => true) {
  try {
    const tempInstance = new sourceClass();
    const propertyNames = Object.getOwnPropertyNames(tempInstance);
    propertyNames.filter(
      (propertyName) => typeof tempInstance[propertyName] !== "undefined" && typeof target[propertyName] === "undefined"
    ).filter((propertyName) => isPropertyInherited(propertyName)).forEach((propertyName) => {
      target[propertyName] = tempInstance[propertyName];
    });
  } catch (e) {
  }
}

// src/utils/inherit-transformation-metadata.utils.ts
function inheritTransformationMetadata(parentClass, targetClass, isPropertyInherited, stackDecorators = true) {
  if (!isClassTransformerAvailable()) {
    return;
  }
  try {
    const transformMetadataKeys = [
      "_typeMetadatas",
      "_exposeMetadatas",
      "_excludeMetadatas",
      "_transformMetadatas"
    ];
    transformMetadataKeys.forEach(
      (key) => inheritTransformerMetadata(
        key,
        parentClass,
        targetClass,
        isPropertyInherited,
        stackDecorators
      )
    );
  } catch (err) {
    logger.error(
      `Transformer ("class-transformer") metadata cannot be inherited for "${parentClass.name}" class.`
    );
    logger.error(err);
  }
}
function inheritTransformerMetadata(key, parentClass, targetClass, isPropertyInherited, stackDecorators = true) {
  let classTransformer;
  try {
    classTransformer = __require("class-transformer/cjs/storage");
  } catch (e) {
    classTransformer = __require("class-transformer/storage");
  }
  const metadataStorage = classTransformer.defaultMetadataStorage;
  while (parentClass && parentClass !== Object) {
    if (metadataStorage[key].has(parentClass)) {
      const metadataMap = metadataStorage[key];
      const parentMetadata = metadataMap.get(parentClass);
      const targetMetadataEntries = Array.from(parentMetadata.entries()).filter(([key2]) => true).map(([key2, metadata]) => {
        if (Array.isArray(metadata)) {
          const targetMetadata = metadata.map((item) => ({
            ...item,
            target: targetClass
          }));
          return [key2, targetMetadata];
        }
        return [key2, { ...metadata, target: targetClass }];
      });
      if (metadataMap.has(targetClass)) {
        const existingRules = metadataMap.get(targetClass).entries();
        const mergeMap = /* @__PURE__ */ new Map();
        [existingRules, targetMetadataEntries].forEach((entries) => {
          for (const [valueKey, value] of entries) {
            if (mergeMap.has(valueKey) && stackDecorators) {
              const parentValue = mergeMap.get(valueKey);
              if (Array.isArray(parentValue)) {
                parentValue.push(...Array.isArray(value) ? value : [value]);
              }
            } else {
              mergeMap.set(valueKey, value);
            }
          }
        });
        metadataMap.set(targetClass, mergeMap);
      } else {
        metadataMap.set(targetClass, new Map(targetMetadataEntries));
      }
    }
    parentClass = Object.getPrototypeOf(parentClass);
  }
}
function isClassTransformerAvailable() {
  try {
    __require("class-transformer");
    return true;
  } catch (e) {
    return false;
  }
}

// src/helpers/intersection-type.helper.ts
function IntersectionType(...classRefs) {
  class IntersectionClassType {
    constructor() {
      classRefs.forEach((classRef) => {
        inheritPropertyInitializers(this, classRef);
      });
    }
  }
  classRefs.forEach((classRef) => {
    inheritValidationMetadata(classRef, IntersectionClassType);
    inheritTransformationMetadata(classRef, IntersectionClassType, void 0, false);
  });
  const intersectedNames = classRefs.reduce((prev, ref) => prev + ref.name, "");
  Object.defineProperty(IntersectionClassType, "name", {
    value: `Intersection${intersectedNames}`
  });
  return IntersectionClassType;
}
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { IntersectionType };
//# sourceMappingURL=intersection-type.helper.mjs.map
//# sourceMappingURL=intersection-type.helper.mjs.map