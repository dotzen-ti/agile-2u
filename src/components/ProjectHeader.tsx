import { Project } from '@/types/project';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const taskCounts = {
    total: project.tasks.length,
    done: project.tasks.filter(t => t.status === 'done').length,
  };

  const progress = taskCounts.total > 0 
    ? Math.round((taskCounts.done / taskCounts.total) * 100) 
    : 0;

  return (
    <header className="h-16 px-6 border-b border-border bg-card flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: project.color }}
        />
        <div>
          <h1 className="font-semibold text-foreground">{project.name}</h1>
          {project.description && (
            <p className="text-xs text-muted-foreground">{project.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Progress</p>
          <p className="text-sm font-medium text-foreground">
            {taskCounts.done}/{taskCounts.total} tasks
          </p>
        </div>
        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
}
