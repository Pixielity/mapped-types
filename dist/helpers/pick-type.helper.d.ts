import { MappedType } from '../interfaces/mapped-type.interface.js'
import { Type } from '../types/type.type.js'
import { RemoveFieldsWithType } from '../types/remove-fields-with-type.type.js'

/**
 * @function PickType
 * @description Creates a new type by picking a set of properties from an existing class.
 * The resulting type will have only the properties specified in the keys array.
 * It also inherits validation and transformation metadata for the picked properties.
 *
 * @param classRef - The class to pick properties from
 * @param keys - An array of property names to pick
 *
 * @returns A new class with only the picked properties
 *
 * @example
 * ```typescript
 * class UserDto {
 *   @IsString()
 *   name: string;
 *
 *   @IsEmail()
 *   email: string;
 *
 *   @IsString()
 *   password: string;
 * }
 *
 * // CreateUserDto will have name, email, and password properties
 * // with the same validation rules as UserDto
 * class CreateUserDto extends PickType(UserDto, ['name', 'email', 'password']) {}
 * ```
 *
 * @publicApi
 */
declare function PickType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): MappedType<RemoveFieldsWithType<Pick<T, (typeof keys)[number]>, Function>>

export { PickType }
