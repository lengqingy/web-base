<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useI18nStore } from '@/store/modules/locale'
import { userStore } from '@/store/modules/userInfo'
import { useRouter } from 'vue-router'

const router = useRouter()

const { t, locale } = useI18n()
const store = userStore()

const toggle = () => {
  const i18nStore = useI18nStore()

  const lang = i18nStore.currentLocale.lang

  const curLang = lang === 'zh-CN' ? 'en' : 'zh-CN'

  i18nStore.setCurrentLocale({ lang: curLang })

  locale.value = curLang
  localStorage.setItem('i18n', curLang)
}

const setToken = () => {
  store.setToken('123')
}

const removeToken = () => {
  store.setToken('')
}

const goLogin = () => {
  router.push('/login')
}
</script>

<template>
  <el-button mb-2 @click="toggle">切换语言</el-button>
  <el-button mb-2 @click="goLogin">login</el-button>
  <el-button mb-2 @click="setToken">setToken</el-button>
  <el-button mb-2 @click="removeToken">removeToken</el-button>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
  </div>
  <el-button>{{ t('login.login') }}</el-button>
  <el-pagination :total="100" />
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
