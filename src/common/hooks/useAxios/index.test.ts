import useAxios from './'
// import { AxiosRequestConfig } from 'axios'

// const runHook = <Data = unknown, Error = unknown>(
//   axiosRequestConfig: AxiosRequestConfig | null,
//   { initialData, ...config }: SWRConfig<Data, Error> = defaultSWRConfig
// ) =>
//   renderHook(() =>
//     useAxios<Data, Error>(axiosRequestConfig, {
//       initialData,
//       ...config,
//     })
//   )

describe('useAxios', () => {
  it('should be defined', () => {
    expect(useAxios).toBeDefined()
  })

  // it('should request successfully with status code 200', async () => {
  //   const { waitForValueToChange, result } = runHook({
  //     url: 'https://api.github.com/',
  //     baseURL: '',
  //   })
  //   await waitForValueToChange(() => result.current.response)
  //   const { response } = result.current
  //   expect(response?.status).toBe(200)
  // }, 10000)
})
