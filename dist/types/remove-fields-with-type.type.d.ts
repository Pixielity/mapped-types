/**
 * @type KeysWithType
 * @description Utility type that extracts keys from an object type T where the value type matches the specified Type.
 * It creates a mapped type that maps each key to itself if the value type extends the specified Type, or to never otherwise.
 * Then it uses keyof T to extract only the keys that weren't mapped to never.
 *
 * @template T The object type to extract keys from
 * @template Type The type to match against property values
 *
 * @example
 * interface Example {
 *   name: string;
 *   age: number;
 *   isActive: boolean;
 *   handler: Function;
 * }
 *
 * // Will be "handler"
 * type FunctionKeys = KeysWithType<Example, Function>;
 */
type KeysWithType<T, Type> = {
    [K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];
/**
 * @type RemoveFieldsWithType
 * @description Utility type that removes fields from a type T where the value type matches the specified Type.
 * It uses the Exclude utility type to remove keys that match the KeysWithType.
 *
 * @template T The object type to remove fields from
 * @template Type The type of fields to remove
 *
 * @example
 * interface Example {
 *   name: string;
 *   age: number;
 *   isActive: boolean;
 *   handler: Function;
 * }
 *
 * // Will be { name: string; age: number; isActive: boolean; }
 * type WithoutFunctions = RemoveFieldsWithType<Example, Function>;
 */
type RemoveFieldsWithType<T, Type> = Exclude<T, KeysWithType<T, Type>>;

export type { RemoveFieldsWithType };
