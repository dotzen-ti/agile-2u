<template>
  <div class="flex-1 overflow-x-auto py-6 px-4"
  >
    <div class="flex gap-4 min-w-max">
      <KanbanColumn
        v-for="column in KANBAN_COLUMNS"
        :key="column.id"
        :id="column.id"
        :label="column.label"
        :tasks="project.tasks.filter((t) => t.status === column.id)"
        @addTask="$emit('addTask', $event, $event)"
        @deleteTask="$emit('deleteTask', $event)"
        @dropTask="$emit('updateTaskStatus', $event[0], $event[1])"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project, TaskStatus } from '@/types/project'
import { KANBAN_COLUMNS } from '@/types/project'
import KanbanColumn from './KanbanColumn.vue'

defineProps<{
  project: Project
}>()

defineEmits<{
  addTask: [title: string, status: TaskStatus]
  deleteTask: [taskId: string]
  updateTaskStatus: [taskId: string, newStatus: TaskStatus]
}>()
</script>
