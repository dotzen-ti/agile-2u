import { ref, computed } from 'vue'
import type { Project, Task, TaskStatus } from '@/types/project'
import { PROJECT_COLORS } from '@/types/project'

const generateId = () => Math.random().toString(36).substring(2, 11)

const initialProjects: Project[] = [
  {
    id: generateId(),
    name: 'Website Redesign',
    description: 'Redesign the company website',
    color: PROJECT_COLORS[0],
    createdAt: new Date(),
    tasks: [
      {
        id: generateId(),
        title: 'Research competitors',
        status: 'done',
        priority: 'high',
        createdAt: new Date(),
      },
      {
        id: generateId(),
        title: 'Create wireframes',
        status: 'doing',
        priority: 'high',
        createdAt: new Date(),
      },
      {
        id: generateId(),
        title: 'Design homepage',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date(),
      },
      {
        id: generateId(),
        title: 'Mobile responsive design',
        status: 'backlog',
        priority: 'medium',
        createdAt: new Date(),
      },
      {
        id: generateId(),
        title: 'User testing',
        status: 'backlog',
        priority: 'low',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: generateId(),
    name: 'Mobile App',
    description: 'Build the mobile application',
    color: PROJECT_COLORS[1],
    createdAt: new Date(),
    tasks: [
      {
        id: generateId(),
        title: 'Setup React Native',
        status: 'done',
        priority: 'high',
        createdAt: new Date(),
      },
      {
        id: generateId(),
        title: 'Authentication flow',
        status: 'testing',
        priority: 'high',
        createdAt: new Date(),
      },
      {
        id: generateId(),
        title: 'Push notifications',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date(),
      },
    ],
  },
]

export function useProjects() {
  const projects = ref<Project[]>(initialProjects)
  const selectedProjectId = ref<string | null>(initialProjects[0]?.id || null)

  const selectedProject = computed(() => projects.value.find((p) => p.id === selectedProjectId.value) || null)

  const addProject = (name: string, description?: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      description,
      color: PROJECT_COLORS[projects.value.length % PROJECT_COLORS.length],
      tasks: [],
      createdAt: new Date(),
    }
    projects.value.push(newProject)
    selectedProjectId.value = newProject.id
    return newProject
  }

  const deleteProject = (projectId: string) => {
    projects.value = projects.value.filter((p) => p.id !== projectId)
    if (selectedProjectId.value === projectId) {
      selectedProjectId.value = projects.value[0]?.id || null
    }
  }

  const addTask = (projectId: string, title: string, status: TaskStatus = 'backlog') => {
    const newTask: Task = {
      id: generateId(),
      title,
      status,
      priority: 'medium',
      createdAt: new Date(),
    }
    const projectIndex = projects.value.findIndex((p) => p.id === projectId)
    if (projectIndex !== -1) {
      projects.value[projectIndex].tasks.push(newTask)
    }
    return newTask
  }

  const updateTaskStatus = (projectId: string, taskId: string, newStatus: TaskStatus) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (project) {
      const task = project.tasks.find((t) => t.id === taskId)
      if (task) {
        task.status = newStatus
      }
    }
  }

  const deleteTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (project) {
      project.tasks = project.tasks.filter((t) => t.id !== taskId)
    }
  }

  return {
    projects,
    selectedProject,
    selectedProjectId,
    addProject,
    deleteProject,
    addTask,
    updateTaskStatus,
    deleteTask,
  }
}
