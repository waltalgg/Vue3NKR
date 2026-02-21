<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isHourValid, isNumber, isTimelineItemValid } from '@/validators.js'

import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import { inject } from 'vue'

const activitySelectOptions = inject('activitySelectOptions')
const setTimelineItemActivity = inject('setTimelineItemActivity')

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  }
})

const emit = defineEmits({
  scrollToHour: isHourValid,
  updateActivitySeconds: isNumber
})

</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<style scoped></style>
