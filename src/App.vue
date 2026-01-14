<template>
  <div class="flex min-h-screen w-full bg-background">
    <ProjectSidebar
      :projects="projects"
      :selectedProjectId="selectedProjectId"
      :isCollapsed="sidebarCollapsed"
      @selectProject="selectedProjectId = $event"
      @addProject="addProject"
      @deleteProject="deleteProject"
      @toggleCollapse="sidebarCollapsed = !sidebarCollapsed"
      @openChat="isChatOpen = true"
    />

    <div class="flex flex-col flex-1">
      <ProjectHeader v-if="selectedProject" :project="selectedProject" />

      <div class="flex-1 flex">
        <EmptyState v-if="!selectedProject" />
        <KanbanBoard
          v-else
          :project="selectedProject"
          @addTask="handleAddTask"
          @deleteTask="handleDeleteTask"
          @updateTaskStatus="handleUpdateTaskStatus"
        />
      </div>
    </div>

    <GeneralChat :isOpen="isChatOpen" @close="isChatOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProjects } from '@/composables/useProjects'
import type { TaskStatus } from '@/types/project'
import ProjectSidebar from '@/components/ProjectSidebar.vue'
import ProjectHeader from '@/components/ProjectHeader.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import EmptyState from '@/components/EmptyState.vue'
import GeneralChat from '@/components/GeneralChat.vue'

const {
  projects,
  selectedProject,
  selectedProjectId,
  addProject,
  deleteProject,
  addTask,
  updateTaskStatus,
  deleteTask,
} = useProjects()

const sidebarCollapsed = ref(false)
const isChatOpen = ref(false)

const handleAddTask = (title: string, status: TaskStatus) => {
  if (selectedProjectId.value) {
    addTask(selectedProjectId.value, title, status)
  }
}

const handleDeleteTask = (taskId: string) => {
  if (selectedProjectId.value) {
    deleteTask(selectedProjectId.value, taskId)
  }
}

const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
  if (selectedProjectId.value) {
    updateTaskStatus(selectedProjectId.value, taskId, newStatus)
  }
}
</script>
