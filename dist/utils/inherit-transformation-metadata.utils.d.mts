import { Type } from '../types/type.type.mjs';

/**
 * @function inheritTransformationMetadata
 * @description Inherits transformation metadata from a parent class to a target class.
 * This allows the target class to have the same transformation rules as the parent class.
 * If class-transformer is not available, this function does nothing.
 *
 * @param parentClass - The class to inherit transformation metadata from
 * @param targetClass - The class to apply the inherited transformation metadata to
 * @param isPropertyInherited - Optional function to determine if a property should be inherited
 * @param stackDecorators - Whether to stack decorators or replace them (default: true)
 *
 * @example
 * class UserDto {
 *   @Expose()
 *   name: string;
 *
 *   @Exclude()
 *   password: string;
 * }
 *
 * class CreateUserDto {
 *   // This class will inherit the transformation metadata for the name and password properties
 * }
 *
 * inheritTransformationMetadata(UserDto, CreateUserDto);
 */
declare function inheritTransformationMetadata(parentClass: Type<any>, targetClass: Function, isPropertyInherited?: (key: string) => boolean, stackDecorators?: boolean): void;

export { inheritTransformationMetadata };
