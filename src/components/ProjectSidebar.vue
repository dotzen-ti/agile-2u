<template>
  <aside
    :class="[
      'h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Header -->
    <div class="h-14 px-4 flex items-center justify-between border-b border-sidebar-border">
      <div v-if="!isCollapsed" class="flex items-center gap-2 animate-fade-in">
        <FolderKanban class="h-5 w-5 text-primary" />
        <span class="font-semibold text-sidebar-foreground">Projects</span>
      </div>
      <button
        @click="$emit('toggleCollapse')"
        class="h-8 w-8 text-muted-foreground hover:text-foreground flex items-center justify-center rounded hover:bg-muted"
      >
        <ChevronLeft :class="['h-4 w-4 transition-transform', isCollapsed && 'rotate-180']" />
      </button>
    </div>

    <!-- Chat Geral -->
    <div class="px-2 py-2 border-b border-sidebar-border">
      <button
        @click="$emit('openChat')"
        :class="[
          'w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent rounded px-3 py-2 flex items-center',
          isCollapsed && 'justify-center px-0',
        ]"
      >
        <MessageCircle class="h-4 w-4 text-primary" />
        <span v-if="!isCollapsed" class="text-sm">Chat Geral</span>
      </button>
    </div>

    <!-- Projects List -->
    <div class="flex-1 overflow-y-auto py-2">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        :class="[
          'group mx-2 mb-1 rounded-lg cursor-pointer transition-all duration-150',
          'hover:bg-sidebar-accent',
          selectedProjectId === project.id && 'bg-sidebar-accent',
        ]"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        <div
          class="flex items-center gap-3 px-3 py-2.5"
          @click="$emit('selectProject', project.id)"
        >
          <div
            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: project.color }"
          />
          <template v-if="!isCollapsed">
            <span
              :class="[
                'flex-1 text-sm truncate transition-colors',
                selectedProjectId === project.id
                  ? 'text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground',
              ]"
            >
              {{ project.name }}
            </span>
            <button
              @click.stop="$emit('deleteProject', project.id)"
              class="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive flex items-center justify-center rounded"
            >
              <Trash2 class="h-3.5 w-3.5" />
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Add Project -->
    <div class="p-3 border-t border-sidebar-border">
      <div v-if="isAddingProject && !isCollapsed" class="animate-fade-in">
        <input
          v-model="newProjectName"
          type="text"
          placeholder="Project name..."
          @keydown="handleKeyDown"
          @blur="handleInputBlur"
          autofocus
          class="w-full h-9 px-3 rounded text-sm border border-border"
        />
      </div>
      <button
        v-else
        @click="isAddingProject = true"
        :class="[
          'w-full justify-start gap-2 text-muted-foreground hover:text-foreground rounded px-3 py-2 flex items-center',
          isCollapsed && 'justify-center px-0',
        ]"
      >
        <Plus class="h-4 w-4" />
        <span v-if="!isCollapsed" class="text-sm">New Project</span>
      </button>
    </div>

    <!-- User Info -->
    <UserInfo :isCollapsed="isCollapsed" />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, FolderKanban, ChevronLeft, Trash2, MessageCircle } from 'lucide-vue-next'
import type { Project } from '@/types/project'
import UserInfo from './UserInfo.vue'

defineProps<{
  projects: Project[]
  selectedProjectId: string | null
  isCollapsed: boolean
}>()

const emit = defineEmits<{
  selectProject: [projectId: string]
  addProject: [name: string]
  deleteProject: [projectId: string]
  toggleCollapse: []
  openChat: []
}>()

const isAddingProject = ref(false)
const newProjectName = ref('')

const handleAddProject = () => {
  if (newProjectName.value.trim()) {
    emit('addProject', newProjectName.value.trim())
    newProjectName.value = ''
    isAddingProject.value = false
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleAddProject()
  } else if (e.key === 'Escape') {
    isAddingProject.value = false
    newProjectName.value = ''
  }
}

const handleInputBlur = () => {
  if (!newProjectName.value.trim()) {
    isAddingProject.value = false
  }
}
</script>
