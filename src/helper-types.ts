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

// Please don't use this if you can avoid it :(
export type UnionToIntersection<T> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends any
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (x: T) => any
    : never
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
) extends (x: infer R) => any
  ? R
  : never

// Whoops, did so anyway
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : /**
     * OK wait I swear I haven't lost it
     * TLDR what's happening here is that `0 | object extends object ? true : false` is `false`
     * Because, well, it is. That union doesn't have any overlap with objects because a union isn't
     * _really_ an "or" like it is in JS.
     *
     * Because of this, when we try to DeepPartial loose types w/ a similar potential union
     * (eg: when `as const` isn't an option w/ DeepPick)
     * the utility type simply halts and does not decide to go deeper.
     *
     * This line allows us to deep partial even through these by converting those types of unions to intersections,
     * where those kinds of "unlike" shapes will converge into a `never`
     */
    UnionToIntersection<T[P]> extends never
    ? DeepPartial<T[P]>
    : T[P]
}
