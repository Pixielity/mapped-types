/**
 * @function isClassTransformerAvailable
 * @description Checks if the class-transformer package is available in the project.
 * This is used to gracefully handle cases where class-transformer is not installed.
 *
 * @returns {boolean} True if class-transformer is available, false otherwise
 *
 * @example
 * ```typescript
 * if (isClassTransformerAvailable()) {
 *   // Use class-transformer features
 * } else {
 *   // Fallback behavior
 * }
 * ```
 */
export function isClassTransformerAvailable() {
  try {
    // Attempt to require class-transformer
    require("class-transformer")
    return true
  } catch {
    // Return false if class-transformer is not available
    return false
  }
}
