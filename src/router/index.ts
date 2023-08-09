import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { userStore } from '@/store/modules/userInfo'
import login from './login'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: async () => await import('@/views/home/index.vue')
  },
  ...login
]

const router = createRouter({
  history: createWebHistory(), // 预渲染需要的模式
  strict: true,
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  const store = userStore()
  // 判断是否有权限返回登录界面
  if (from.meta.isAuth) {
    if (store.token) {
      next()
    } else {
      next('/login')
    }
  } else {
    console.log('没有权限')
    next()
  }
})
export default router
