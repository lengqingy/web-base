import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// 国际化
import { setupI18n } from './locales'
// 引入状态管理
import { setupStore } from '@/store'

// 创建实例
const setupAll = async () => {
  const app = createApp(App)

  setupStore(app)

  app.use(router)

  setupI18n(app)

  await router.isReady()

  app.mount('#app')
}

setupAll()
