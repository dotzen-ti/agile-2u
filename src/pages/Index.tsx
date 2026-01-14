import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectSidebar } from '@/components/ProjectSidebar';
import { ProjectHeader } from '@/components/ProjectHeader';
import { KanbanBoard } from '@/components/KanbanBoard';
import { EmptyState } from '@/components/EmptyState';
import { GeneralChat } from '@/components/GeneralChat';
import { TaskStatus } from '@/types/project';

const Index = () => {
  const {
    projects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
    addProject,
    deleteProject,
    addTask,
    updateTaskStatus,
    deleteTask,
  } = useProjects();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleAddTask = (title: string, status: TaskStatus) => {
    if (selectedProjectId) {
      addTask(selectedProjectId, title, status);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (selectedProjectId) {
      deleteTask(selectedProjectId, taskId);
    }
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    if (selectedProjectId) {
      updateTaskStatus(selectedProjectId, taskId, newStatus);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <ProjectSidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onAddProject={addProject}
        onDeleteProject={deleteProject}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <GeneralChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {selectedProject ? (
          <>
            <ProjectHeader project={selectedProject} />
            <KanbanBoard
              project={selectedProject}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          </>
        ) : (
          <EmptyState onCreateProject={() => addProject('New Project')} />
        )}
      </main>
    </div>
  );
};

export default Index;
