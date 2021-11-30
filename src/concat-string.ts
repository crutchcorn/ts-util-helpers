export type JoinStr<T extends Array<unknown>> = T extends []
  ? ''
  : T extends [string]
  ? `${T[0]}`
  : T extends [string, ...infer R]
  ? `${T[0]}${JoinStr<R>}`
  : string

export function concatStr<T extends Array<string>>(...strs: T): JoinStr<T> {
  return strs.join('') as never
}
