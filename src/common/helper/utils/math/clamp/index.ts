import { assert } from '@sindresorhus/is'

export const clamp = (
  value: number,
  { min, max }: { min: number; max: number }
) => {
  assert.number(value)

  if (value < min) {
    value = min
  } else if (value > max) {
    value = max
  }

  return value
}

export default clamp
