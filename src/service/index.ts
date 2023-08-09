import { service } from './service'

import { config } from './config'

const { defaultHeaders } = config

const request = async (option: any) => {
  const { baseURL, url, method, params, data, headersType, responseType, headers } = option
  return await service({
    baseURL,
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      'Content-Type': headersType || defaultHeaders,
      ...headers
    }
  })
}
export default {
  get: async <T = any>(option: any) => {
    const res = await request({ method: 'GET', ...option })
    return res.data as unknown as T
  },
  post: async <T = any>(option: any) => {
    const res = await request({ method: 'POST', ...option })
    return res.data as unknown as T
  },
  postOriginal: async (option: any) => {
    const res = await request({ method: 'POST', ...option })
    return res
  }
}
