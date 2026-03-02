<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import { onActivated } from 'vue'
import {
  scrollToHour,
  timelineItems,
  timelineItemRefs,
  scrollToCurrentHour,
} from '@/timeline-items.js'

onActivated(scrollToCurrentHour)

</script>

<template>
  <div class="mt-10">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>

<style scoped></style>
