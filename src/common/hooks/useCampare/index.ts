// https://zhuanlan.zhihu.com/p/86211675
// https://github.com/epoberezkin/fast-deep-equal
// https://github.com/streamich/react-use/blob/master/docs/useShallowCompareEffect.md
// https://github.com/sandiiarov/use-deep-compare
import { useRef } from 'react'
import isEqual from 'react-fast-compare'

export function useCampare<T>(
  value: T,
  compare: (value: T | undefined, oldValue: T | undefined) => boolean = isEqual
) {
  const ref = useRef<T>()

  if (!compare(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export default useCampare
