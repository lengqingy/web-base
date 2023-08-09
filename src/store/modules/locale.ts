// 想要使用必须先引入 defineStore；
import { defineStore } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { store } from '../index'

const lang: string = localStorage.getItem('i18n') ?? navigator.language ?? 'en'

const elLocaleMap: any = {
  'zh-CN': zhCn,
  en
}

// defineStore 方法有两个参数，第一个参数是模块化名字（也就相当于身份证一样，不能重复）
// 第二个参数是选项，对象里面有三个属性，相比于vuex 少了一个 mutations.
export const useStore = defineStore('i18n', {
  state() {
    // 存放的就是模块的变量
    return {
      currentLocale: {
        lang,
        elLocale: elLocaleMap[lang]
      },
      // 多语言
      localeMap: [
        {
          lang: 'zh-CN',
          name: '简体中文'
        },
        {
          lang: 'en',
          name: 'English'
        }
      ]
    }
  },
  getters: {
    // 相当于vue里面的计算属性，可以缓存数据
    getCurrentLocale(): any {
      return this.currentLocale
    },
    getLocaleMap(): any {
      return this.localeMap
    }
  },
  actions: {
    // 可以通过actions 方法，改变 state 里面的值。
    setCurrentLocale(localeMap: any) {
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
    }
  }
})

export const useI18nStore = () => {
  return useStore(store)
}
