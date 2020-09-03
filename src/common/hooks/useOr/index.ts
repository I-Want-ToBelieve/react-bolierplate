import { useMemo } from 'react'

export type useOr = (...booleans: boolean[]) => boolean
export const useOr: useOr = (...booleans) =>
  useMemo(() => booleans.some(Boolean), [booleans])

export default useOr
