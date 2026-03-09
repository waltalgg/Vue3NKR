import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items.js'
import { calculateCompletionPercentage, trackedActivities } from '@/activities.js'
import { getProgressColorClass } from '@/functions.js'
import { computed } from 'vue'

export function useTotalProgress() {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete,
        ),
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  return {
    colorClass,
    percentage,
  }
}
