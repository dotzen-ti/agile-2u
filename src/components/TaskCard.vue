<template>
  <div
    draggable="true"
    @dragstart="$emit('dragStart', $event)"
    :class="[
      'group bg-card rounded-lg p-3 shadow-card cursor-grab active:cursor-grabbing',
      'border border-border/50 hover:border-border hover:shadow-elevated',
      'transition-all duration-150 animate-scale-in',
    ]"
  >
    <div class="flex items-start gap-2">
      <GripVertical class="h-4 w-4 text-muted-foreground/40 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div class="flex-1 min-w-0">
        <p class="text-sm text-foreground font-medium leading-snug">
          {{ task.title }}
        </p>
        <p v-if="task.description" class="text-xs text-muted-foreground mt-1 line-clamp-2">
          {{ task.description }}
        </p>
        <div class="flex items-center gap-2 mt-2">
          <span :class="[
            'text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide',
            priorityStyles[task.priority],
          ]">
            {{ task.priority }}
          </span>
        </div>
      </div>
      <button
        @click.stop="$emit('delete')"
        class="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive -mt-1 -mr-1 flex items-center justify-center"
      >
        <Trash2 class="h-3.5 w-3.5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GripVertical, Trash2 } from 'lucide-vue-next'
import type { Task } from '@/types/project'

defineProps<{
  task: Task
}>()

defineEmits<{
  dragStart: [event: DragEvent]
  delete: []
}>()

const priorityStyles = ref({
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
})
</script>
