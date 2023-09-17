export type ValueOf<T> = T[keyof T]

type ShapeOf<T> = Record<keyof T, unknown>
export type AssertKeysEqual<X extends ShapeOf<Y>, Y extends ShapeOf<X>> = Y

export type AssertEnumMatch<
  X extends Record<string, keyof Y>,
  Y extends Record<ValueOf<X> & string, unknown>,
> = Y