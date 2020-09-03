import { useState, useCallback, useEffect } from 'react'

export type useMouseCoordinates = () => number[]
export const useMouseCoordinates: useMouseCoordinates = () => {
  const [coordinates, setCoordinates] = useState([0, 0])

  const updateCoordinates = useCallback(
    (event: MouseEvent) => void setCoordinates([event.pageX, event.pageY]),
    []
  )

  useEffect(() => {
    window.addEventListener('mousemove', updateCoordinates)
    return () => {
      window.removeEventListener('mousemove', updateCoordinates)
    }
  }, [updateCoordinates])

  return coordinates
}

export default useMouseCoordinates
