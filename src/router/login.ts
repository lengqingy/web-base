export default [
  {
    path: '/login',
    name: 'login',
    component: async () => await import('@/views/login/index.vue')
  }
]
