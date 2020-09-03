import React, { useRef, useLayoutEffect, useMemo } from 'react'
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js'

export const useVideoJS = (
  videoJsOptions: VideoJsPlayerOptions,
  debug?: boolean
) => {
  const videoNode = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<VideoJsPlayer | null>(null)

  useLayoutEffect(() => {
    // https://docs.videojs.com/tutorial-setup.html#manual-setup
    // https://docs.videojs.com/tutorial-options.html
    // https://docs.videojs.com/tutorial-setup.html#player-readiness
    const player = videojs(videoNode.current, videoJsOptions)

    playerRef.current = player

    if (debug) {
      ;(window as any).player = player
    }

    return () => {
      playerRef.current = null
      // https://docs.videojs.com/tutorial-player-workflows.html#removing-players
      player.dispose()
    }
  }, [debug, videoJsOptions])

  return useMemo(
    () => ({
      video: (
        <div data-vjs-player key={JSON.stringify(videoJsOptions)}>
          <video ref={videoNode} className="video-js" />
        </div>
      ),
      playerRef,
    }),
    [videoJsOptions]
  )
}

export default useVideoJS
