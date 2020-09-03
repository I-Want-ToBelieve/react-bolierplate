import { useState, useEffect, useCallback } from 'react'
import { VideoJsPlayer } from 'video.js'

export const usePlayOrStop = (player: VideoJsPlayer | null) => {
  const [isPlaying, toggle] = useState(false)

  useEffect(() => {
    if (player === null) return void 0

    const handlePlaying = () => void toggle(true)
    const handlePaused = () => void toggle(false)

    player.on('play', handlePlaying)
    player.on('pause', handlePaused)

    return () => {
      player.off('play', handlePlaying)
      player.off('pause', handlePaused)
    }
  }, [player])

  const playOrStop = useCallback(() => {
    if (player === null) return void 0

    if (player.paused()) {
      player.play()
    } else {
      player.pause()
    }
  }, [player])

  return [isPlaying, playOrStop] as const
}

export default usePlayOrStop
