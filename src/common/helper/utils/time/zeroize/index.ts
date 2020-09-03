export const zeroize = (number: number) =>
  number < 10 ? String(0) + String(number) : String(number)
export default zeroize
