import { useMemo } from 'react'
import _useActive from '../useActive'
import classNames from 'classnames'

export interface useActiveForClassNamesProps {
  isActive?: boolean
  staticClassNames?: string | string[]
  activeClassNames: string | string[]
  useActive?: _useActive
}
export type useActiveForClassNames = (
  props: useActiveForClassNamesProps
) => React.HTMLAttributes<Element>

export const useActiveForClassNames: useActiveForClassNames = ({
  isActive = false,
  staticClassNames = '',
  activeClassNames,
  useActive = _useActive,
}) => {
  const [attributes, isActive_] = useActive(isActive)

  const _classNames = useMemo(
    () => ({
      ...attributes,
      className: classNames(staticClassNames, isActive_ && activeClassNames),
    }),
    [attributes, staticClassNames, isActive_, activeClassNames]
  )

  return _classNames
}

export default useActiveForClassNames
