import { useCallback, useEffect, useRef } from 'react'

export type useMouseImmediately = () => React.MutableRefObject<number[]>
export const useMouseImmediately: useMouseImmediately = () => {
  const coordinates = useRef([0, 0])

  const updateCoordinates = useCallback((event: MouseEvent) => {
    coordinates.current = [event.pageX, event.pageY]
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', updateCoordinates)
    return () => {
      window.removeEventListener('mousemove', updateCoordinates)
    }
  }, [updateCoordinates])

  return coordinates
}

export default useMouseImmediately
