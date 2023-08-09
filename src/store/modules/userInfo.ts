// 想要使用必须先引入 defineStore；
import { defineStore } from 'pinia'
import { store } from '../index'
import { getAccessToken, setToken } from '@/utils/auth'

// defineStore 方法有两个参数，第一个参数是模块化名字（也就相当于身份证一样，不能重复）
// 第二个参数是选项，对象里面有三个属性，相比于vuex 少了一个 mutations.
export const useStore = defineStore('userInfo', {
  state() {
    // 存放的就是模块的变量
    return {
      token: getAccessToken(),
      userInfo: {
        id: ''
      }
    }
  },
  getters: {
    // 相当于vue里面的计算属性，可以缓存数据
    getToken(): any {
      return this.token
    },
    getUserInfo(): any {
      return this.userInfo
    }
  },
  actions: {
    // 可以通过actions 方法，改变 state 里面的值。
    setToken(token: string) {
      this.token = token
      setToken(token)
    },
    setCurrentLocale(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})

export const userStore = () => {
  return useStore(store)
}
