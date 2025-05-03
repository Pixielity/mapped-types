import { MappedType } from '../interfaces/mapped-type.interface.mjs';
import { Type } from '../types/type.type.mjs';
import { RemoveFieldsWithType } from '../types/remove-fields-with-type.type.mjs';

/**
 * @type UnionToIntersection
 * @description Utility type that converts a union type to an intersection type.
 * This uses a clever trick with function parameters and return types to achieve the conversion.
 *
 * @template U The union type to convert to an intersection
 *
 * @example
 * ```typescript
 * type Union = { a: string } | { b: number };
 * // Becomes { a: string } & { b: number }
 * type Intersection = UnionToIntersection<Union>;
 * ```
 *
 * @see https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
/**
 * @type ClassRefsToConstructors
 * @description Utility type that converts an array of class references to an array of their instance types.
 * It uses the infer keyword to extract the instance type from each Type<T>.
 *
 * @template T The array of class references to convert
 *
 * @example
 * ```typescript
 * type ClassRefs = [Type<Foo>, Type<Bar>];
 * // Becomes [Foo, Bar]
 * type Constructors = ClassRefsToConstructors<ClassRefs>;
 * ```
 */
type ClassRefsToConstructors<T extends Type[]> = {
    [U in keyof T]: T[U] extends Type<infer V> ? V : never;
};
/**
 * @type Intersection
 * @description Utility type that creates an intersection type from an array of class references.
 * It first converts the array of class references to an array of their instance types,
 * then converts that array to a union type using indexed access,
 * and finally converts the union type to an intersection type.
 *
 * @template T The array of class references to create an intersection from
 *
 * @example
 * ```typescript
 * class Foo { a: string; }
 * class Bar { b: number; }
 *
 * // Becomes MappedType<Foo & Bar>
 * type FooBar = Intersection<[Type<Foo>, Type<Bar>]>;
 * ```
 */
type Intersection<T extends Type[]> = MappedType<RemoveFieldsWithType<UnionToIntersection<ClassRefsToConstructors<T>[number]>, Function>>;
/**
 * @function IntersectionType
 * @description Creates a new type by intersecting multiple existing classes.
 * The resulting type will have all properties from all the input classes.
 * It also inherits validation and transformation metadata from all input classes.
 *
 * @param classRefs - The classes to intersect
 *
 * @returns A new class with all properties from all input classes
 *
 * @example
 * ```typescript
 * class UserDto {
 *   @IsString()
 *   name: string;
 * }
 *
 * class AddressDto {
 *   @IsString()
 *   street: string;
 * }
 *
 * // UserWithAddressDto will have both name and street properties
 * // with the same validation rules as the original classes
 * class UserWithAddressDto extends IntersectionType(UserDto, AddressDto) {}
 * ```
 *
 * @publicApi
 */
declare function IntersectionType<T extends Type[]>(...classRefs: T): Intersection<T>;

export { IntersectionType };
