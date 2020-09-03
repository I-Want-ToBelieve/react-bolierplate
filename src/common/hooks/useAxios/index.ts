import useSWR, { ConfigInterface, responseInterface } from 'swr'
import axios_, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosStatic,
} from 'axios'

interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error'
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
}

export interface SWRConfig<Data = unknown, Error = unknown>
  extends Omit<
    ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data
}
// https://github.com/zeit/swr#options
export const defaultSWRConfig: SWRConfig<any, any> = {}

export function useAxios<Data = unknown, Error = unknown>(
  axiosRequestConfig: AxiosRequestConfig | null,
  { initialData, ...config }: SWRConfig<Data, Error> = defaultSWRConfig,
  axios: AxiosStatic | AxiosInstance = axios_
): Return<Data, Error> {
  const { data: response, error, isValidating, revalidate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(
    axiosRequestConfig && JSON.stringify(axiosRequestConfig),
    () => axios(axiosRequestConfig ?? {}),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: axiosRequestConfig ?? {},
        headers: {},
        data: initialData,
      },
    }
  )

  return {
    data: response?.data,
    response,
    error,
    isValidating,
    revalidate,
  }
}

export function createAxiosHook(axios: AxiosInstance) {
  return function <Data = unknown, Error = unknown>(
    axiosRequestConfig: AxiosRequestConfig | null,
    { initialData, ...config }: SWRConfig<Data, Error> = defaultSWRConfig
  ) {
    return useAxios(axiosRequestConfig, { initialData, ...config }, axios)
  }
}

export default useAxios
