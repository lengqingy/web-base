<template>
  <el-button @click="login">login</el-button>
</template>

<script setup lang="ts">
import { loginApi } from '@/api/login'

const login = async () => {
  console.log(123)
  const params = {}
  const res = await loginApi(params)
  console.log(res)
}
</script>

<style scoped lang="scss"></style>
