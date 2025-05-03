/**
 * @function isClassValidatorAvailable
 * @description Checks if the class-validator package is available in the project.
 * This is used to gracefully handle cases where class-validator is not installed.
 *
 * @returns {boolean} True if class-validator is available, false otherwise
 *
 * @example
 * ```typescript
 * if (isClassValidatorAvailable()) {
 *   // Use class-validator features
 * } else {
 *   // Fallback behavior
 * }
 * ```
 */
declare function isClassValidatorAvailable(): boolean;

export { isClassValidatorAvailable };
