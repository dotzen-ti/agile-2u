<template>
  <header class="h-16 px-6 border-b border-border bg-card flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div
        class="w-3 h-3 rounded-full"
        :style="{ backgroundColor: project.color }"
      />
      <div>
        <h1 class="font-semibold text-foreground">{{ project.name }}</h1>
        <p v-if="project.description" class="text-xs text-muted-foreground">
          {{ project.description }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="text-right">
        <p class="text-xs text-muted-foreground">Progress</p>
        <p class="text-sm font-medium text-foreground">
          {{ taskCounts.done }}/{{ taskCounts.total }} tasks
        </p>
      </div>
      <div class="w-24 h-2 bg-muted rounded-full overflow-hidden">
        <div
          class="h-full bg-primary rounded-full transition-all duration-500"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/types/project'

const { project } = defineProps<{
  project: Project
}>()

const taskCounts = computed(() => ({
  total: project.tasks.length,
  done: project.tasks.filter((t) => t.status === 'done').length,
}))

const progress = computed(() => {
  const total = taskCounts.value.total
  return total > 0 ? Math.round((taskCounts.value.done / total) * 100) : 0
})
</script>
