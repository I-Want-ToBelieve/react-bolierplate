export interface TraversalOptions<T, R> {
  handle: (iterable: T, ref: R) => unknown
  breakCondition: (iterable: T, ref: R) => boolean
  next: (iterable: T, ref: R) => T | null | undefined
  ref: R
}
export type Traversal = <T, R>(
  iterable: T | T[],
  traversalOptions: TraversalOptions<T, R>
) => R
export const traversal: Traversal = (
  iterable,
  { ref, handle, breakCondition, next }
) => {
  if (Array.isArray(iterable)) {
    for (const it of iterable) {
      if (breakCondition(it, ref)) break

      traversal(it, {
        handle,
        breakCondition,
        next,
        ref,
      })
    }

    return ref
  } else {
    handle(iterable, ref)
    if (breakCondition(iterable, ref)) return ref

    const _next = next(iterable, ref)
    if (_next === null || _next === undefined) return ref

    return traversal(_next, {
      handle,
      breakCondition,
      next,
      ref,
    })
  }
}

export default traversal
