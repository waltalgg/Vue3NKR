import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items.js'
import { calculateActivityCompletePercentage } from '@/activities.js'
import { getProgressColorClass } from '@/functions.js'
import { computed } from 'vue'

export function useProgress(activity) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() =>
    calculateActivityCompletePercentage(activity, trackedActivitySeconds.value),
  )

  const trackedActivitySeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity),
  )
  return {
    colorClass,
    percentage,
    trackedActivitySeconds,
  }
}
