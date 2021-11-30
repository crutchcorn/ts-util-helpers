// NaN also, but `typeof NaN` === number
export type Falsy = false | null | undefined | 0 | -0 | 0n | ''

export type AnyArray<T> = Array<T> | ReadonlyArray<T>
