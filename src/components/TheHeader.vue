<script setup>
import TheLogo from '../components/TheLogo.vue'
import TheHeaderProgress from '../components/TheHeaderProgress.vue'
import { PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants.js'
import { navigate } from '@/router.js'


</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="navigate(PAGE_TIMELINE)" />
    <TheHeaderProgress @click="navigate(PAGE_PROGRESS)" />
  </header>
</template>

<style scoped></style>
