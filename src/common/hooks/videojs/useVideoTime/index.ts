import { VideoJsPlayer } from 'video.js'
import { useEffect, useRef } from 'react'
import { useInterval } from 'react-use'
import { useImmer } from 'use-immer'

export const useVideoTime = (player: VideoJsPlayer | null) => {
  // Wrap the player in ref
  // to ensure that the latest values are retrieved from the asynchronous functions
  const playerRef = useRef(player)

  const [timeState, setTimeState] = useImmer({
    current: player?.currentTime() ?? 0,
    max: player?.duration() ?? 0,
    buffered: player?.bufferedPercent() ?? 0,
  })

  useEffect(() => {
    if (player === null) return void 0

    const handleTimeUpdate = () =>
      void setTimeState((timeState) => {
        timeState.current = player.currentTime()
      })
    const handleDurationChange = () =>
      void setTimeState((timeState) => {
        timeState.max = player.duration()
      })

    // https://docs.videojs.com/player
    player.on('timeupdate', handleTimeUpdate)
    player.on('durationchange', handleDurationChange)

    return () => {
      player.off('timeupdate', handleTimeUpdate)
      player.off('durationchange', handleDurationChange)
    }
  }, [player, setTimeState])

  useInterval(() => {
    setTimeState((timeState) => {
      // be careful!
      // You should always use the value after the ref wrap in asynchronous functions to avoid closure issues
      timeState.buffered = playerRef.current?.bufferedPercent() ?? 0
    })
  }, 1000)

  return timeState
}

export default useVideoTime
