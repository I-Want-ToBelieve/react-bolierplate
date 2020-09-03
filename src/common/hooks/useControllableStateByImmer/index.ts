import { useCallback, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import is from '@sindresorhus/is'

export function useControllableStateByImmer<S = any>(props: S | (() => S)) {
  const [controllableState, setControllableState] = useImmer(props)
  const isControlledRef = useRef(false)
  const [control, decontrol] = [
    useCallback(() => {
      isControlledRef.current = true
    }, []),
    useCallback(() => {
      isControlledRef.current = false
    }, []),
  ]

  useEffect(() => {
    // if the component is not controlled by the user, it is controlled by the parent component
    if (!isControlledRef.current) {
      const _props = is.function_(props) ? props() : props

      if (is.object(_props)) {
        setControllableState((state) => {
          Object.keys(state).forEach((key) => {
            ;(state as any)[key] = (props as any)[key]
          })
        })
      } else {
        setControllableState((state) => _props)
      }
    }
  }, [props, setControllableState])

  return [
    [controllableState, setControllableState],
    [control, decontrol],
    isControlledRef,
  ] as const // https://blog.staleclosure.com/effective-typescript/
}

export default useControllableStateByImmer
