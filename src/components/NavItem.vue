<script setup>
import { currentPage, navigate } from '@/router.js'
import { isNavItemValid } from '@/validators.js'
import { computed } from 'vue'

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid,
  }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'bg-gray-200 pointer-events-none': props.navItem.page === currentPage.value },
])
</script>

<template>
  <li class="flex-1">
    <a v-bind="$attrs" :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
      <component :is="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>

<style scoped></style>
