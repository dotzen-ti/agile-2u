import { Project, KANBAN_COLUMNS, TaskStatus } from '@/types/project';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  project: Project;
  onAddTask: (title: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export function KanbanBoard({
  project,
  onAddTask,
  onDeleteTask,
  onUpdateTaskStatus,
}: KanbanBoardProps) {
  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex gap-4 min-w-max">
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            label={column.label}
            tasks={project.tasks.filter((t) => t.status === column.id)}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
            onDropTask={onUpdateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}
