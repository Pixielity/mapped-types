var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/utils/apply-validate-if-defined-decorator.utils.ts
function applyValidateIfDefinedDecorator(targetClass, propertyKey) {
  if (!isClassValidatorAvailable()) {
    return;
  }
  const classValidator = __require("class-validator");
  const decoratorFactory = classValidator.ValidateIf((_, value) => value !== void 0);
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

export { applyValidateIfDefinedDecorator };
//# sourceMappingURL=apply-validate-if-defined-decorator.utils.mjs.map
//# sourceMappingURL=apply-validate-if-defined-decorator.utils.mjs.map