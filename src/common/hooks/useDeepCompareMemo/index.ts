/**
 * @see https://sourcegraph.com/github.com/sandiiarov/use-deep-compare/-/blob/src/useDeepCompareMemo.ts#L3
 * `useDeepCompareMemo` will only recompute the memoized value when one of the
 * `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useMemo.
 *
 */

import { useMemo } from 'react'
import { useCampare } from '../useCampare'
import is, { assert } from '@sindresorhus/is'

export function useDeepCompareMemo<T>(
  factory: () => T,
  deps: React.DependencyList
) {
  assert.any([is.object, is.array, is.nullOrUndefined], ...deps)

  return useMemo(factory, useCampare(deps))
}

export default useDeepCompareMemo
