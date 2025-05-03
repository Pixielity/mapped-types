'use strict';

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/utils/validator-availability.utils.ts
function isClassValidatorAvailable() {
  try {
    __require("class-validator");
    return true;
  } catch (e) {
    return false;
  }
}
if (typeof module !== "undefined") { module.exports = module.exports.default; }

exports.isClassValidatorAvailable = isClassValidatorAvailable;
//# sourceMappingURL=validator-availability.utils.js.map
//# sourceMappingURL=validator-availability.utils.js.map