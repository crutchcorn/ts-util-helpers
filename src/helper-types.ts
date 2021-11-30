export type OnlyOptional<T> = {
  [key in keyof T as Extract<T[key], undefined> extends never
    ? never
    : key]: T[key]
}

export type OnlyNonOptional<T> = {
  [key in keyof T as Extract<T[key], undefined> extends never
    ? key
    : never]: T[key]
}
