<template>
  <el-config-provider :locale="currentLocale.elLocale" :message="{ max: 1 }">
    <router-view />
  </el-config-provider>
  <br />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18nStore } from '@/store/modules/locale'

const i18nStore = useI18nStore()

const currentLocale = computed(() => i18nStore.currentLocale)
</script>

<style></style>
