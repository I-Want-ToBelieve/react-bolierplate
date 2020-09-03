import { css } from 'emotion'
import { useMemo } from 'react'

export type useStyle = (...styles: Parameters<typeof css>) => string
export const useStyle: useStyle = (...styles) => {
  const classname = useMemo(() => css(...styles), [styles])

  return classname
}

export default useStyle
