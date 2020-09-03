/**
 * @see https://sourcegraph.com/github.com/sandiiarov/use-deep-compare/-/blob/src/useDeepCompareCallback.ts#L16:45
 * `useDeepCompareEffect` will return a memoized version of the callback that
 * only changes if one of the `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useEffect.
 *
 */

import { useCallback } from 'react'
import { useCampare } from '../useCampare'
import is, { assert } from '@sindresorhus/is'

export function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
) {
  assert.any([is.object, is.array, is.nullOrUndefined], ...deps)

  return useCallback(callback, useCampare(deps)!)
}

export default useDeepCompareCallback
