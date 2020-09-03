import { useCallback } from 'react'
import { VideoJsPlayer } from 'video.js'

export const FASTFORWARD = 'FASTFORWARD'
export const FASTREVERSE = 'FASTREVERSE'
export type useFFFRArgs = {
  player: VideoJsPlayer | null
  type: typeof FASTFORWARD | typeof FASTREVERSE
  /**
   * @default 5 (s)
   */
  interval?: number
}
export const useFFFR = ({ player, type, interval = 5 }: useFFFRArgs) => {
  const handleFFFR = useCallback(() => {
    if (player === null) return void 0

    if (type === FASTFORWARD) {
      player.currentTime(player.currentTime() + interval)
    } else {
      player.currentTime(player.currentTime() - interval)
    }
  }, [interval, player, type])

  return handleFFFR
}

export default useFFFR
