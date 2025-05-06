'use strict';

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
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.inheritPropertyInitializers = inheritPropertyInitializers;
//# sourceMappingURL=inherit-property-initializers.utils.js.map
//# sourceMappingURL=inherit-property-initializers.utils.js.map