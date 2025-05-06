/**
 * @function applyIsOptionalDecorator
 * @description Applies the IsOptional decorator from class-validator to a property of a class.
 * This makes the property optional for validation purposes, allowing null or undefined values.
 * If class-validator is not available, this function does nothing.
 *
 * @param targetClass - The class constructor to apply the decorator to
 * @param propertyKey - The name of the property to make optional
 *
 * @example
 * class UserDto {
 *   @IsString()
 *   name: string;
 * }
 *
 * // Make the name property optional
 * applyIsOptionalDecorator(UserDto, 'name');
 */
declare function applyIsOptionalDecorator(targetClass: Function, propertyKey: string): void;

export { applyIsOptionalDecorator };
