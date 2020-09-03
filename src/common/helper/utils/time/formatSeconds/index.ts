import { assert } from '@sindresorhus/is'

export const formatSeconds = (seconds: number, { hasHours = true }) => {
  assert.number(seconds)

  let [seconds_, minutes, hours] = [Math.floor(seconds), 0, 0]

  if (seconds_ >= 60) {
    minutes = Math.floor(seconds_ / 60)
    seconds_ = seconds_ % 60

    if (hasHours && minutes >= 60) {
      hours = Math.floor(minutes / 60)
      minutes = minutes % 60
    }
  }

  return hasHours ? [hours, minutes, seconds_] : [minutes, seconds_]
}

export default formatSeconds
