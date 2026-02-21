<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import { validateTimelineItems } from '@/validators.js'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants.js'
import { currentPage } from '@/router.js'

defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems,
  },
})

const timelineItemRefs = ref([])

defineExpose({ scrollToHour })

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false) // Передаем текущий час
  }
})

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()
  const options = { behavior: isSmooth ? 'smooth' : 'instant' } // Плавная или резкая прокрутка
  if (hour === MIDNIGHT_HOUR || hour === MIDNIGHT_HOUR + 1) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 2].$el.scrollIntoView(options)
  }
}
</script>

<template>
  <div class="mt-10">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>

<style scoped></style>
