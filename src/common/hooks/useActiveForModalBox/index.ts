import { useMemo, useState, useCallback, useEffect } from 'react'

export type useActiveForModalBox = (
  isActive?: boolean
) => [React.HTMLAttributes<Element>, boolean]
export const useActiveForModalBox: useActiveForModalBox = (
  isActive = false
) => {
  const [isActive_, toggle] = useState(isActive)
  const toFocus = useMemo(
    () => ({
      onClick: (event: React.MouseEvent<Element, MouseEvent>) => {
        event.stopPropagation()
        toggle(() => true)
      },
    }),
    []
  )
  const toBlur = useCallback(() => void toggle(() => false), [])

  useEffect(() => {
    window.addEventListener('click', toBlur)
    return () => {
      window.removeEventListener('click', toBlur)
    }
  }, [toBlur])

  return [toFocus, isActive_]
}

export default useActiveForModalBox
