// 获取token
export const getAccessToken = () => {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return localStorage.getItem('token') ?? ''
}

// 设置token
export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}
