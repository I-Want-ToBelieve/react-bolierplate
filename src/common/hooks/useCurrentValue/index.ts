// https://juejin.im/post/5d75ae7a6fb9a06b0f2407e8#heading-20
import { useRef } from 'react'

export function useCurrentValue<T>(value: T) {
  const ref = useRef<T | null>(null)
  ref.current = value
  return ref
}

export default useCurrentValue
