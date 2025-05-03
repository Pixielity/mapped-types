import { Type } from '../types/type.type.js'

/**
 * @function inheritValidationMetadata
 * @description Inherits validation metadata from a parent class to a target class.
 * This allows the target class to have the same validation rules as the parent class.
 * If class-validator is not available, this function does nothing.
 *
 * @param parentClass - The class to inherit validation metadata from
 * @param targetClass - The class to apply the inherited validation metadata to
 * @param isPropertyInherited - Optional function to determine if a property should be inherited
 *
 * @returns {string[] | undefined} An array of property names that had validation metadata applied,
 *                                or undefined if class-validator is not available or an error occurred
 *
 * @example
 * ```typescript
 * class UserDto {
 *   @IsString()
 *   name: string;
 * }
 *
 * class CreateUserDto {
 *   // This class will inherit the validation metadata for the name property
 * }
 *
 * inheritValidationMetadata(UserDto, CreateUserDto);
 * ```
 */
declare function inheritValidationMetadata(
  parentClass: Type<any>,
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean,
): string[] | undefined

export { inheritValidationMetadata }
