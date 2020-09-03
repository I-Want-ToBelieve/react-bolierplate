export const defaultGeneratedPool = new Map<string, string>()
export const createGeneratedPool = () => new Map<string, string>()

export type AntiCollisionRandomString = (
  generatedPool?: Map<string, string>
) => string
export const antiCollisionRandomString: AntiCollisionRandomString = (
  generatedPool = defaultGeneratedPool
) => {
  const randomString = Math.random().toString(36).substr(2, 10)

  if (!generatedPool.has(randomString)) {
    generatedPool.set(randomString, randomString)
    return randomString
  }

  return antiCollisionRandomString(generatedPool)
}

export default antiCollisionRandomString
