<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import {
  isActivityValid,
  isPageValid,
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions,
  validateTimelineItems,
} from '@/validators.js'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants.js'

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems,
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions,
  },
  activities: {
    required: true,
    type: Array,
    validator: validateActivities,
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid,
  },
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  },
})

const timelineItemRefs = ref([])
watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToCurrentHourItem()
  }
})

function scrollToCurrentHourItem() {
  const currentHour = new Date().getHours()
  if (currentHour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView()
  } else {
    timelineItemRefs.value[currentHour - 1].$el.scrollIntoView()
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
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        ref="timelineItemRefs"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
      />
    </ul>
  </div>
</template>

<style scoped></style>
