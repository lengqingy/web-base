const config: {
  baseUrl: string
  resultCode: number | string
  defaultHeaders: any
  requestTimeout: number
} = {
  /**
   * api请求基础路径
   */
  baseUrl: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_URL,
  /**
   * 接口成功返回状态码
   */
  resultCode: 200,

  /**
   * 接口请求超时时间
   */
  requestTimeout: 30000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json'
}

export { config }
