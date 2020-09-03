import { useHoverDirty as useHoverDirty_ } from 'react-use'
import { useRef } from 'react'

export const useHoverDirty = () => {
  const ref = useRef(null)
  return [ref, useHoverDirty_(ref)] as const
}

export default useHoverDirty
