/**
 * @see https://sourcegraph.com/github.com/sandiiarov/use-deep-compare/-/blob/src/useDeepCompareEffect.ts#L15
 * `useDeepCompareEffect` Accepts a function that contains imperative, possibly
 * effectful code.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useEffect.
 *
 */

import { useEffect } from 'react'
import { useCampare } from '../useCampare'
import is, { assert } from '@sindresorhus/is'

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  assert.any([is.object, is.array, is.nullOrUndefined], ...deps)

  return useEffect(effect, useCampare(deps))
}

export default useDeepCompareEffect
