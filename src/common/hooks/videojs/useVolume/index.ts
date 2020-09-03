import { useState, useEffect, useCallback } from 'react'
import { VideoJsPlayer } from 'video.js'

export const useVolume = (player: VideoJsPlayer | null) => {
  const [currentVolume, _setCurrentVolume] = useState(player?.volume() ?? 1)

  useEffect(() => {
    if (player === null) return void 0

    const handleVolumeChange = () => void _setCurrentVolume(player.volume())

    player.on('volumechange', handleVolumeChange)

    return () => {
      player.off('volumechange', handleVolumeChange)
    }
  }, [player])

  const setCurrentVolume = useCallback(
    (value) => {
      player?.volume(value)
    },
    [player]
  )

  const [isMuted, toggle] = useState(player?.muted())
  const [preVolume, setPreVolume] = useState(player?.volume() ?? 1)

  useEffect(() => {
    if (player === null) return void 0

    const handleVolumeChange = () =>
      void (player.volume() === 0 ? toggle(true) : toggle(false))

    player.on('volumechange', handleVolumeChange)

    return () => {
      player.off('volumechange', handleVolumeChange)
    }
  }, [player])

  const playOrMute = useCallback(
    (e) => {
      if (player === null) return void 0

      if (!player.muted()) {
        setPreVolume(player.volume())
        player.volume(0)
      } else {
        player.volume(preVolume)
      }

      player.muted(!player.muted())
      toggle((state) => !state)
    },
    [player, preVolume]
  )

  return [currentVolume, setCurrentVolume, isMuted, playOrMute] as const
}

export default useVolume
