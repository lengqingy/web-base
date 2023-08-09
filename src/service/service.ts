import axios from 'axios'
import { config } from './config'
import qs from 'qs'
import { i18n } from '@/locales/index'
import { ElMessage } from 'element-plus'
import errorCode from './errorCode'
import { getAccessToken, setToken } from '@/utils/auth'
import { trimText } from '@/utils'
import { useRouter } from 'vue-router'

const { resultCode, baseUrl, requestTimeout } = config

// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
  '无效的刷新令牌', // 刷新令牌被删除时，不用提示
  '刷新令牌已过期' // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
]

// 请求白名单，无须token的接口
const whiteList: string[] = ['/login', '/refresh-token', '/jmreport']

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // API的基本URL
  timeout: requestTimeout // 超时时间，单位为毫秒
})

// 在请求发送之前拦截请求
service.interceptors.request.use(
  (config) => {
    // 可以在请求发送前添加一些请求头或统一处理请求数据
    // 是否需要设置 token
    const inWhiteList = whiteList.some((v) => config.url && config.url.includes(v))
    if (getAccessToken() && !inWhiteList) {
      config.headers.Authorization = 'Bearer ' + getAccessToken() // 让每个请求携带自定义token
    }

    config.params = trimText(config.params)

    const contentType = config.headers['Content-Type']
    if (contentType === 'application/x-www-form-urlencoded') {
      config.data = trimText(config.data)
    }

    // 处理请求类型
    const params = config.params || {}
    const data = config.data || false
    // post
    if (config.method?.toUpperCase() === 'POST' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(data)
    }
    // get
    if (config.method?.toUpperCase() === 'GET' && params) {
      let url = config.url + '?'
      for (const propName of Object.keys(params)) {
        const value = params[propName]
        if (value !== undefined && value !== null && typeof value !== 'undefined') {
          if (typeof value === 'object') {
            for (const val of Object.keys(value)) {
              const params = propName + '[' + val + ']'
              const subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[val]) + '&'
            }
          } else {
            url += `${propName}=${encodeURIComponent(value)}&`
          }
        }
      }
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据
      // const now = new Date().getTime()
      // params = params.substring(0, url.length - 1) + `?_t=${now}`
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  async (error) => {
    // 请求错误时做些事
    console.error(error) // for debug
    return await Promise.reject(error)
  }
)

// 在接收到响应时拦截响应
service.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    const t = i18n.global.t
    const { data } = response

    if (!data) {
      // 返回“[HTTP]请求没有返回值”;
      throw new Error()
    }
    // 未设置状态码则默认成功状态
    const code = data.code || resultCode
    // 二进制数据则直接返回
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data
    }
    // 获取错误信息
    const msg = data.msg || (errorCode as any)[code] || errorCode.default
    if (ignoreMsgs.includes(msg)) {
      // 如果是忽略的错误码，直接返回 msg 异常
      return Promise.reject(msg)
    } else if (code === 401) {
      // 登录失效，清空token，返回登录页
      return goLogin()
    } else if (code === 500) {
      // 服务器错误
      ElMessage.error(t('service.errMsg500'))
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      if (msg === '无效的刷新令牌') {
        // hard coding：忽略这个提示，直接登出
        goLogin()
      } else {
        console.log('err', msg)
        ElMessage.error(msg)
      }
      return Promise.reject(new Error(msg))
    } else {
      return data
    }
  },
  async (error) => {
    // 处理响应错误
    console.log('err' + error) // for debug
    let { message } = error
    const t = i18n.global.t
    if (message === 'Network Error') {
      message = t('service.errorMessage')
    } else if (message.includes('timeout')) {
      message = t('service.apiTimeoutMessage')
    } else if (message.includes('Request failed with status code')) {
      message = t('service.apiRequestFailed') + message.substr(message.length - 3)
    }
    ElMessage.error(message)
    return await Promise.reject(error)
  }
)

// 去登录页，并清空token
const goLogin = async () => {
  const router = useRouter()
  setToken('')
  router.push('/login')
}

export { service }
