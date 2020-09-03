import { useEffect } from 'react'

export type useForwardRef = <T>(
  ref: React.MutableRefObject<T | null> | undefined,
  refSource: React.MutableRefObject<T> | React.RefObject<T>
) => React.MutableRefObject<T | null> | undefined
export const useForwardRef: useForwardRef = (ref, refSource) => {
  useEffect(() => {
    if (refSource.current == null || ref?.current === void 0) return void 0

    ref.current = refSource.current

    return () => {
      // Be careful!
      // When forwarding a reference, always empty the reference in the useEffect's clear function
      // Because references in js may have different stack spaces
      // So this can lead to something unexpected
      // https://www.zhihu.com/question/27114726/answer/35481766
      ref.current = null
    }
  }, [ref, refSource])

  return ref
}

export default useForwardRef
