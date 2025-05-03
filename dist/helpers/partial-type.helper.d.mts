import { MappedType } from '../interfaces/mapped-type.interface.mjs';
import { Type } from '../types/type.type.mjs';
import { RemoveFieldsWithType } from '../types/remove-fields-with-type.type.mjs';

/**
 * @function PartialType
 * @description Creates a new type by making all properties of an existing class optional.
 * The resulting type will have the same properties as the input class, but all will be optional.
 * It also inherits validation and transformation metadata, and applies IsOptional or ValidateIf
 * decorators to make validation rules respect the optional nature of the properties.
 *
 * @param classRef - The class to make properties optional for
 * @param options - Configuration options
 * @param options.skipNullProperties - If true, validations will be ignored for null or undefined values.
 *                                    If false, validations will be ignored only for undefined values.
 *                                    Defaults to true.
 *
 * @returns A new class with all properties made optional
 *
 * @example
 * ```typescript
 * class UserDto {
 *   @IsString()
 *   name: string;
 *
 *   @IsEmail()
 *   email: string;
 * }
 *
 * // UpdateUserDto will have optional name and email properties
 * // with the same validation rules as UserDto, but they'll only be
 * // applied if the properties are defined
 * class UpdateUserDto extends PartialType(UserDto) {}
 * ```
 *
 * @publicApi
 */
declare function PartialType<T>(classRef: Type<T>, 
/**
 *  Configuration options.
 */
options?: {
    /**
     * If true, validations will be ignored on a property if it is either null or undefined. If
     * false, validations will be ignored only if the property is undefined.
     * @default true
     */
    skipNullProperties?: boolean;
}): MappedType<RemoveFieldsWithType<Partial<T>, Function>>;

export { PartialType };
