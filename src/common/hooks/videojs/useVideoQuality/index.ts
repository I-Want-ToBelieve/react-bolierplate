import { useState, useEffect, useCallback } from 'react'
import { VideoJsPlayer } from 'video.js'
import dash from 'dashjs'

export const useVideoQuality = (player: VideoJsPlayer | null) => {
  const [bitrateInfoList, setBitrateInfoList] = useState<dash.BitrateInfo[]>(
    (player as any).dash.mediaPlayer.getBitrateInfoListFor('video')
  )

  useEffect(() => {
    if (player === null) return void 0
    const dash = (player as any).dash
    if (!dash) return void 0

    if (dash) {
      setBitrateInfoList(() => dash.mediaPlayer.getBitrateInfoListFor('video'))
    }
  }, [player])

  const getCurrentVideoQuality = useCallback(() => {
    if (!bitrateInfoList) return '1080p'
    const dash = (player as any).dash
    if (player === null) return '1080p'
    if (!dash) return '1080p'

    return (
      bitrateInfoList[dash.mediaPlayer.getQualityFor('video')]?.height ??
      '1080p'
    )
  }, [bitrateInfoList, player])

  const [currentVideoQuality, updateCurrentVideoQuality] = useState(
    getCurrentVideoQuality()
  )

  const setQualityForVideo = useCallback(
    (value) => {
      if (!bitrateInfoList) return void 0
      const dash = (player as any).dash
      if (player === null) return void 0
      if (!dash) return void 0
      // http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html

      dash.mediaPlayer.setAutoSwitchQualityFor('video', false)
      dash.mediaPlayer.setQualityFor(
        'video',
        bitrateInfoList.findIndex((it) => it.height === value)
      )

      updateCurrentVideoQuality(getCurrentVideoQuality())
    },
    [bitrateInfoList, getCurrentVideoQuality, player]
  )

  return [bitrateInfoList, currentVideoQuality, setQualityForVideo] as const
}
export default useVideoQuality
