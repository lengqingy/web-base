import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './lang/en.ts'
import zh from './lang/zh-CN.ts'

// 默认读取本地存储语言设置
const defaultLocale = localStorage.getItem('i18n') ?? navigator.language ?? 'en'

export const i18n = createI18n({
  // 默认语言先取自定义的，再取浏览器的，最后默认英文
  locale: defaultLocale, // 默认语言
  fallbackLocale: 'en', // 不存在默认则为英文
  allowComposition: true, // 允许组合式api
  messages: {
    'zh-CN': zh,
    'en-US': en,
    en
  }
})

export const setupI18n = async (app: App<Element>) => {
  app.use(i18n)
}
