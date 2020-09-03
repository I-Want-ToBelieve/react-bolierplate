import { useCallback, useEffect, useRef, useState } from 'react'
import is from '@sindresorhus/is'

export function useControllableState<S = any>(props: S | (() => S)) {
  const [controllableState, setControllableState] = useState(props)
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
      setControllableState(() => _props)
    }
  }, [props, setControllableState])

  return [
    [controllableState, setControllableState],
    [control, decontrol],
    isControlledRef,
  ] as const // https://blog.staleclosure.com/effective-typescript/
}

export default useControllableState
