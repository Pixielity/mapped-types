'use strict';

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/utils/apply-is-optional-decorator.utils.ts
function applyIsOptionalDecorator(targetClass, propertyKey) {
  if (!isClassValidatorAvailable()) {
    return;
  }
  const classValidator = __require("class-validator");
  const decoratorFactory = classValidator.IsOptional();
  decoratorFactory(targetClass.prototype, propertyKey);
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

exports.applyIsOptionalDecorator = applyIsOptionalDecorator;
//# sourceMappingURL=apply-is-optional-decorator.utils.js.map
//# sourceMappingURL=apply-is-optional-decorator.utils.js.map