<template>
  <div
    :class="[
      'flex-1 min-w-[280px] max-w-[320px] rounded-xl p-3 transition-all duration-200',
      styles.bg,
      isDragOver && 'ring-2 ring-primary/30 ring-inset',
    ]"
    @dragover.prevent="isDragOver = true"
    @dragleave="isDragOver = false"
    @drop.prevent="handleDrop"
  >
    <!-- Column Header -->
    <div class="flex items-center gap-2 mb-3 px-1">
      <div :class="['w-2 h-2 rounded-full', styles.accent]" />
      <h3 class="font-medium text-sm text-foreground">{{ label }}</h3>
      <span class="text-xs text-muted-foreground bg-background/60 px-1.5 py-0.5 rounded-full">
        {{ tasks.length }}
      </span>
    </div>

    <!-- Tasks -->
    <div class="space-y-2 mb-2 min-h-[100px]">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="$emit('deleteTask', task.id)"
        @dragStart="(e: DragEvent) => {
          e.dataTransfer!.setData('taskId', task.id)
        }"
      />
    </div>

    <!-- Add Task -->
    <div v-if="isAddingTask" class="animate-fade-in">
      <input
        v-model="newTaskTitle"
        type="text"
        placeholder="Task title..."
        @keydown="handleKeyDown"
        @blur="handleInputBlur"
        autofocus
        class="w-full h-9 px-3 rounded text-sm bg-card border border-border"
      />
    </div>
    <button
      v-else
      @click="isAddingTask = true"
      class="w-full justify-start gap-2 text-muted-foreground hover:text-foreground h-9 flex items-center px-3 rounded hover:bg-muted"
    >
      <Plus class="h-4 w-4" />
      <span class="text-sm">Add task</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import type { Task, TaskStatus } from '@/types/project'
import TaskCard from './TaskCard.vue'

const props = defineProps<{
  id: TaskStatus
  label: string
  tasks: Task[]
}>()

const emit = defineEmits<{
  addTask: [title: string, status: TaskStatus]
  deleteTask: [taskId: string]
  dropTask: [taskId: string, newStatus: TaskStatus]
}>()

const isAddingTask = ref(false)
const newTaskTitle = ref('')
const isDragOver = ref(false)

const columnStyles: Record<TaskStatus, { bg: string; accent: string }> = {
  backlog: { bg: 'bg-kanban-backlog', accent: 'bg-kanban-backlog-accent' },
  todo: { bg: 'bg-kanban-todo', accent: 'bg-kanban-todo-accent' },
  doing: { bg: 'bg-kanban-doing', accent: 'bg-kanban-doing-accent' },
  testing: { bg: 'bg-kanban-testing', accent: 'bg-kanban-testing-accent' },
  done: { bg: 'bg-kanban-done', accent: 'bg-kanban-done-accent' },
}

const styles = columnStyles[props.id]

const handleAddTask = () => {
  if (newTaskTitle.value.trim()) {
    emit('addTask', newTaskTitle.value.trim(), props.id)
    newTaskTitle.value = ''
    isAddingTask.value = false
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleAddTask()
  } else if (e.key === 'Escape') {
    isAddingTask.value = false
    newTaskTitle.value = ''
  }
}

const handleInputBlur = () => {
  if (!newTaskTitle.value.trim()) {
    isAddingTask.value = false
  }
}

const handleDrop = (e: DragEvent) => {
  isDragOver.value = false
  const taskId = e.dataTransfer?.getData('taskId')
  if (taskId) {
    emit('dropTask', taskId, props.id)
  }
}
</script>
