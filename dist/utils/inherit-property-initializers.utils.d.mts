import { Type } from '../types/type.type.mjs';

/**
 * @function inheritPropertyInitializers
 * @description Inherits property initializers from a source class to a target object.
 * This copies the default values of properties from an instance of the source class
 * to the target object, but only for properties that are undefined in the target.
 *
 * @param target - The target object to inherit property initializers to
 * @param sourceClass - The source class to inherit property initializers from
 * @param isPropertyInherited - Optional function to determine if a property should be inherited
 *                             (defaults to inheriting all properties)
 *
 * @example
 * class UserDto {
 *   name: string = 'Default Name';
 *   isActive: boolean = true;
 * }
 *
 * const target = {};
 * inheritPropertyInitializers(target, UserDto);
 * // target is now { name: 'Default Name', isActive: true }
 */
declare function inheritPropertyInitializers(target: Record<string, any>, sourceClass: Type<any>, isPropertyInherited?: (key: string) => boolean): void;

export { inheritPropertyInitializers };
