import { createAxiosHook } from 'common/hooks/useAxios'
import { axiosFactory } from 'common/helper'
const { REACT_APP_API_URL } = process.env

export const axiosApi = axiosFactory(REACT_APP_API_URL ?? '', {
  useInterceptors: false,
})

export const useAxios = createAxiosHook(axiosApi.request)
