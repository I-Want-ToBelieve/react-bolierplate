import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import { useState, useEffect, useCallback } from 'react'

export interface Options {
  /**
   * Does the playbackRates get initialized only once
   */
  isOnce?: boolean
}
export const usePlaybackRates = (
  player: VideoJsPlayer | null,
  options: Options = {}
) => {
  const { isOnce = false } = options
  const [playbackRates, setPlaybackRates] = useState<number[]>([])

  useEffect(() => {
    if (player === null) return void 0
    if (isOnce && playbackRates.length !== 0) return void 0

    setPlaybackRates(
      () =>
        ((player as any).options() as VideoJsPlayerOptions)
          .playbackRates as number[]
    )
  }, [isOnce, playbackRates, player])

  const setPlaybackRate = useCallback(
    (value: number) => {
      if (player === null) return void 0
      player.playbackRate(value)
    },
    [player]
  )

  const getPlaybackRate = useCallback(() => {
    if (player === null) return void 0
    // https://docs.videojs.com/html5#setPlaybackRate
    const html5 = player.tech('html5') as any

    return html5.playbackRate()
  }, [player])

  return [playbackRates, setPlaybackRate, getPlaybackRate] as const
}
export default usePlaybackRates
