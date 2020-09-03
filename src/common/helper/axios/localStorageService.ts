export interface Tokens {
  accessToken: string
  refreshToken: string
}
export function setTokens(tokens: Tokens) {
  localStorage.setItem('access_token', tokens.accessToken)
  localStorage.setItem('refresh_token', tokens.refreshToken)
}
export function setAccessToken(accessToken: string) {
  localStorage.setItem('access_token', accessToken)
}
export function setRefreshToken(refreshToken: string) {
  localStorage.setItem('refresh_token', refreshToken)
}
export function clearAccessToken() {
  localStorage.removeItem('access_token')
}
export function clearRefreshToken() {
  localStorage.removeItem('refresh_token')
}
export function clearTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
export function getAccessToken() {
  return localStorage.getItem('access_token')
}
export function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}
export function getTokens() {
  return {
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
  }
}
