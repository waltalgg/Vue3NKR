<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline/index.js'
import { isActivityValid } from '@/validators.js'

let activity = ''

const emit = defineEmits({
  submit: isActivityValid,
})
function submit() {
  emit('submit', activity)
}


</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      :value="activity"
      @input="activity = $event.target.value"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    >
    <BaseButton>
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>

<style scoped></style>
