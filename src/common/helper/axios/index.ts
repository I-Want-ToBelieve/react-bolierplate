import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Qs from 'qs'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
} from './localStorageService'
import Config from 'config/index'

export interface AxiosStruct {
  request: AxiosInstance
  requestInterceptorHandle: number
  responseInterceptorHandle: number
}

// https://github.com/axios/axios#interceptors
// https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
// https://github.com/axios/axios/issues/690
export const requestInterceptor = [
  (config: AxiosRequestConfig) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
]
export const responseInterceptor = [
  (response: AxiosResponse) => {
    return response
  },
  async (error: any) => {
    const originalRequest = error.config
    const refreshTokenURL = Config.refreshTokenURL
    const loginRoutePath = Config.loginRoutePath ?? '/login'

    if (
      error.response.status === 401 &&
      originalRequest.url === refreshTokenURL
    ) {
      // jump to the login page
      // https://dev.to/samanthaming/window-location-cheatsheet-4edl
      clearTokens()
      window.location.assign(loginRoutePath)
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const res = await axios.post<{
        accessToken: string
        refreshToken: string
        expireAt: string
      }>(refreshTokenURL, {
        refreshToken: getRefreshToken(),
      })

      if (res.status === 201) {
        setAccessToken(res.data.accessToken)
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${getAccessToken()}`
        return axios(originalRequest)
      }
    }

    return Promise.reject(error)
  },
]

export interface axiosFactoryOptions {
  useInterceptors?: boolean
}
export const axiosFactory = (
  baseURL: string,
  options: axiosFactoryOptions = {
    useInterceptors: true,
  }
): AxiosStruct => {
  const { useInterceptors } = options

  // https://github.com/axios/axios#request-config
  const request = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    },
  })
  return {
    request,
    ...(useInterceptors
      ? {
          requestInterceptorHandle: request.interceptors.request.use(
            ...requestInterceptor
          ),
          responseInterceptorHandle: request.interceptors.response.use(
            ...responseInterceptor
          ),
        }
      : { requestInterceptorHandle: -1, responseInterceptorHandle: -1 }),
  }
}

export * from './localStorageService'
