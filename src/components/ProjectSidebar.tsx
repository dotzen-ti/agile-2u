import { useState } from 'react';
import { Plus, FolderKanban, ChevronLeft, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import { UserInfo } from './UserInfo';

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onAddProject: (name: string) => void;
  onDeleteProject: (projectId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenChat: () => void;
}

export function ProjectSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
  onAddProject,
  onDeleteProject,
  isCollapsed,
  onToggleCollapse,
  onOpenChat,
}: ProjectSidebarProps) {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      onAddProject(newProjectName.trim());
      setNewProjectName('');
      setIsAddingProject(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddProject();
    } else if (e.key === 'Escape') {
      setIsAddingProject(false);
      setNewProjectName('');
    }
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <FolderKanban className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sidebar-foreground">Projects</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Chat Geral */}
      <div className="px-2 py-2 border-b border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed && "justify-center px-0"
          )}
          onClick={onOpenChat}
        >
          <MessageCircle className="h-4 w-4 text-primary" />
          {!isCollapsed && <span className="text-sm">Chat Geral</span>}
        </Button>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto py-2">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={cn(
              "group mx-2 mb-1 rounded-lg cursor-pointer transition-all duration-150",
              "hover:bg-sidebar-accent",
              selectedProjectId === project.id && "bg-sidebar-accent"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className="flex items-center gap-3 px-3 py-2.5"
              onClick={() => onSelectProject(project.id)}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: project.color }}
              />
              {!isCollapsed && (
                <>
                  <span className={cn(
                    "flex-1 text-sm truncate transition-colors",
                    selectedProjectId === project.id 
                      ? "text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground"
                  )}>
                    {project.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProject(project.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Project */}
      <div className="p-3 border-t border-sidebar-border">
        {isAddingProject && !isCollapsed ? (
          <div className="animate-fade-in">
            <Input
              placeholder="Project name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!newProjectName.trim()) {
                  setIsAddingProject(false);
                }
              }}
              autoFocus
              className="h-9 text-sm"
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
              isCollapsed && "justify-center px-0"
            )}
            onClick={() => setIsAddingProject(true)}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span className="text-sm">New Project</span>}
          </Button>
        )}
      </div>

      {/* User Info */}
      <UserInfo isCollapsed={isCollapsed} />
    </aside>
  );
}
