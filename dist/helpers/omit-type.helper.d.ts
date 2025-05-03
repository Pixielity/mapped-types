import { MappedType } from '../interfaces/mapped-type.interface.js'
import { Type } from '../types/type.type.js'
import { RemoveFieldsWithType } from '../types/remove-fields-with-type.type.js'

/**
 * @function OmitType
 * @description Creates a new type by omitting a set of properties from an existing class.
 * The resulting type will have all properties except those specified in the keys array.
 * It also inherits validation and transformation metadata for the remaining properties.
 *
 * @param classRef - The class to omit properties from
 * @param keys - An array of property names to omit
 *
 * @returns A new class without the omitted properties
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
 * // UserResponseDto will have name and email properties, but not password
 * // with the same validation rules as UserDto
 * class UserResponseDto extends OmitType(UserDto, ['password']) {}
 * ```
 *
 * @publicApi
 */
declare function OmitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): MappedType<RemoveFieldsWithType<Omit<T, (typeof keys)[number]>, Function>>

export { OmitType }
