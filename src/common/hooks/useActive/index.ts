import { useMemo, useState, useCallback, useEffect } from 'react'
import { antiCollisionRandomString } from 'common/helper'

export type useActive = (
  isActive?: boolean
) => [React.HTMLAttributes<Element>, boolean]
export const useActive: useActive = (isActive = false) => {
  const [isActive_, toggle] = useState(isActive)
  // https://github.com/sindresorhus/crypto-random-string
  const randomString = useMemo(() => antiCollisionRandomString(), [])
  const toFocus = useMemo(
    () => ({
      onMouseDown: () => void toggle(() => true),
      // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*
      'data-use-active-id': randomString,
    }),
    [randomString]
  )
  const toBlur = useCallback(
    (event: MouseEvent) => {
      // https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
      // https://stackoverflow.com/questions/6581680/whats-the-difference-between-htmlelement-and-element
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Element
      if (event.target instanceof Element) {
        // https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.zh-CN.md#1.6
        // https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors
        if (event.target.closest(`[data-use-active-id="${randomString}"]`)) {
          return void 0
        }
      }
      toggle(() => false)
    },
    [randomString]
  )

  useEffect(() => {
    window.addEventListener('mousedown', toBlur)
    return () => {
      window.removeEventListener('mousedown', toBlur)
    }
  }, [toBlur])

  return [toFocus, isActive_]
}

export default useActive
