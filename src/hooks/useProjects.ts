import { useState, useCallback } from 'react';
import { Project, Task, TaskStatus, PROJECT_COLORS } from '@/types/project';

const generateId = () => Math.random().toString(36).substring(2, 11);

const initialProjects: Project[] = [
  {
    id: generateId(),
    name: 'Website Redesign',
    description: 'Redesign the company website',
    color: PROJECT_COLORS[0],
    createdAt: new Date(),
    tasks: [
      { id: generateId(), title: 'Research competitors', status: 'done', priority: 'high', createdAt: new Date() },
      { id: generateId(), title: 'Create wireframes', status: 'doing', priority: 'high', createdAt: new Date() },
      { id: generateId(), title: 'Design homepage', status: 'todo', priority: 'medium', createdAt: new Date() },
      { id: generateId(), title: 'Mobile responsive design', status: 'backlog', priority: 'medium', createdAt: new Date() },
      { id: generateId(), title: 'User testing', status: 'backlog', priority: 'low', createdAt: new Date() },
    ],
  },
  {
    id: generateId(),
    name: 'Mobile App',
    description: 'Build the mobile application',
    color: PROJECT_COLORS[1],
    createdAt: new Date(),
    tasks: [
      { id: generateId(), title: 'Setup React Native', status: 'done', priority: 'high', createdAt: new Date() },
      { id: generateId(), title: 'Authentication flow', status: 'testing', priority: 'high', createdAt: new Date() },
      { id: generateId(), title: 'Push notifications', status: 'todo', priority: 'medium', createdAt: new Date() },
    ],
  },
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjects[0]?.id || null);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

  const addProject = useCallback((name: string, description?: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      description,
      color: PROJECT_COLORS[projects.length % PROJECT_COLORS.length],
      tasks: [],
      createdAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
    return newProject;
  }, [projects.length]);

  const deleteProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (selectedProjectId === projectId) {
      setSelectedProjectId(projects[0]?.id || null);
    }
  }, [selectedProjectId, projects]);

  const addTask = useCallback((projectId: string, title: string, status: TaskStatus = 'backlog') => {
    const newTask: Task = {
      id: generateId(),
      title,
      status,
      priority: 'medium',
      createdAt: new Date(),
    };
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, tasks: [...p.tasks, newTask] }
        : p
    ));
    return newTask;
  }, []);

  const updateTaskStatus = useCallback((projectId: string, taskId: string, newStatus: TaskStatus) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { 
            ...p, 
            tasks: p.tasks.map(t => 
              t.id === taskId ? { ...t, status: newStatus } : t
            ) 
          }
        : p
    ));
  }, []);

  const deleteTask = useCallback((projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
        : p
    ));
  }, []);

  return {
    projects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
    addProject,
    deleteProject,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
}
