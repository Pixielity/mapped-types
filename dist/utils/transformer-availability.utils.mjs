var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/utils/transformer-availability.utils.ts
function isClassTransformerAvailable() {
  try {
    __require("class-transformer");
    return true;
  } catch (e) {
    return false;
  }
}
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { isClassTransformerAvailable };
//# sourceMappingURL=transformer-availability.utils.mjs.map
//# sourceMappingURL=transformer-availability.utils.mjs.map