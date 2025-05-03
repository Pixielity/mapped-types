/**
 * @function applyValidateIfDefinedDecorator
 * @description Applies the ValidateIf decorator from class-validator to a property of a class.
 * This makes the validation only run if the property is defined (not undefined).
 * If class-validator is not available, this function does nothing.
 *
 * @param targetClass - The class constructor to apply the decorator to
 * @param propertyKey - The name of the property to conditionally validate
 *
 * @example
 * ```typescript
 * class UserDto {
 *   @IsString()
 *   name: string;
 * }
 *
 * // Only validate the name property if it's defined
 * applyValidateIfDefinedDecorator(UserDto, 'name');
 * ```
 */
declare function applyValidateIfDefinedDecorator(targetClass: Function, propertyKey: string): void;

export { applyValidateIfDefinedDecorator };
