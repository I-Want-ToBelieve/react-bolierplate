export const checkNumber = (
  number: number,
  { meaningful = false, isDivisor = false, reallyNumber = 1 }
) => {
  const [isNaN, isInfinity, isZero] = [
    Number.isNaN(number),
    !Number.isFinite(number),
    isDivisor && number === 0,
  ]

  try {
    if (isNaN) {
      throw new Error('number is NaN')
    } else if (isInfinity) {
      throw new Error('number is Infinity')
    } else if (isZero) {
      throw new Error('divisor is zero')
    }
  } catch (error) {
    process.env.NODE_ENV === 'development'
      ? console.error(error)
      : console.warn(error)
  } finally {
    return isZero || ([isNaN, isInfinity].some((it) => it) && meaningful)
      ? reallyNumber
      : number
  }
}

export default checkNumber
