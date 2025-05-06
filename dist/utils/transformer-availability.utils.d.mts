/**
 * @function isClassTransformerAvailable
 * @description Checks if the class-transformer package is available in the project.
 * This is used to gracefully handle cases where class-transformer is not installed.
 *
 * @returns {boolean} True if class-transformer is available, false otherwise
 *
 * @example
 * if (isClassTransformerAvailable()) {
 *   // Use class-transformer features
 * } else {
 *   // Fallback behavior
 * }
 */
declare function isClassTransformerAvailable(): boolean;

export { isClassTransformerAvailable };
