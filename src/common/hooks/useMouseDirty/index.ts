import { useMouse as useMouse_ } from 'react-use'
import { useRef } from 'react'

export const useMouseDirty = () => {
  const ref = useRef(null)
  return [ref, useMouse_(ref)] as const
}

export default useMouseDirty
