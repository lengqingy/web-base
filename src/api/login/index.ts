import request from '@/service'

export interface CodeImgResult {
  captchaOnOff: boolean
  img: string
  uuid: string
}
export interface SmsCodeVO {
  mobile: string
  scene: number
}
export interface SmsLoginVO {
  mobile: string
  code: string
}

// 登录
export const loginApi = async (data: any) => {
  return await request.post({ url: '/system/auth/login', data })
}

// 登出
export const loginOutApi = async () => {
  return await request.post({ url: '/system/auth/logout' })
}

// 获取用户权限信息
export const getInfoApi = async () => {
  return await request.get({ url: '/system/auth/get-permission-info' })
}

// 路由
export const getAsyncRoutesApi = async () => {
  return await request.get({ url: '/system/auth/list-menus' })
}

// 获取登录验证码
export const sendSmsCodeApi = async (data: SmsCodeVO) => {
  return await request.post({ url: '/system/auth/send-sms-code', data })
}

// 短信验证码登录
export const smsLoginApi = async (data: SmsLoginVO) => {
  return await request.post({ url: '/system/auth/sms-login', data })
}

// 社交授权的跳转
export const socialAuthRedirectApi = async (type: number, redirectUri: string) => {
  return await request.get({
    url: '/system/auth/social-auth-redirect?type=' + type + '&redirectUri=' + redirectUri
  })
}
// 获取验证图片  以及token
export const getCodeApi = async (data: any) => {
  return await request.postOriginal({ url: 'system/captcha/get', data })
}

// 滑动或者点选验证
export const reqCheckApi = async (data: any) => {
  return await request.postOriginal({ url: 'system/captcha/check', data })
}
