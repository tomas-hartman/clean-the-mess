export type ValueOf<T> = T[keyof T];

type ShapeOf<T> = Record<keyof T, unknown>;
export type AssertKeysEqual<X extends ShapeOf<Y>, Y extends ShapeOf<X>> = Y;

export type AssertEnumMatch<X extends Record<string, keyof Y>, Y extends Record<ValueOf<X> & string, unknown>> = Y;

// https://stackoverflow.com/questions/60269936/typescript-convert-generic-object-from-snake-to-camel-case
export type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Uppercase<T>}${CamelToSnakeCase<U>}`
  : S;

export type EnumGuard<T extends Record<string, unknown>> = {
  [K in keyof T as `${CamelToSnakeCase<K & string>}`]: K;
};

export type MakePropRequired<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
