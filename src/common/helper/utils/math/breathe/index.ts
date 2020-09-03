import Big from 'big.js'

/**
 * 它返回一个函数, 第一次调用它返回的函数时它返回 0(min),
 * 之后每次调用返回的数都比它之前一次调用返回的数大 0.1(stepping),
 * 直到它返回的数等于 1(max) 时,
 * 之后每次调用它, 它返回的数都比它之前一次调用返回的数小 0.1(stepping),
 * 如此反复.
 */
export const breathe = (
  min = 0,
  max = 1,
  stepping = 0.1,
  ref = {
    value: Big(min).minus(stepping),
    flag: true,
  }
) => () => {
  ref.value = ref.flag ? ref.value.plus(stepping) : ref.value.minus(stepping)
  if (ref.value.eq(max) || (!ref.flag && ref.value.eq(min))) {
    ref.flag = !ref.flag
  }
  return Number(ref.value)
}
