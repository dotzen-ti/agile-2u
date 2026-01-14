import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Task, TaskStatus } from '@/types/project';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  id: TaskStatus;
  label: string;
  tasks: Task[];
  onAddTask: (title: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onDropTask: (taskId: string, newStatus: TaskStatus) => void;
}

const columnStyles: Record<TaskStatus, { bg: string; accent: string }> = {
  backlog: { bg: 'bg-kanban-backlog', accent: 'bg-kanban-backlog-accent' },
  todo: { bg: 'bg-kanban-todo', accent: 'bg-kanban-todo-accent' },
  doing: { bg: 'bg-kanban-doing', accent: 'bg-kanban-doing-accent' },
  testing: { bg: 'bg-kanban-testing', accent: 'bg-kanban-testing-accent' },
  done: { bg: 'bg-kanban-done', accent: 'bg-kanban-done-accent' },
};

export function KanbanColumn({
  id,
  label,
  tasks,
  onAddTask,
  onDeleteTask,
  onDropTask,
}: KanbanColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim(), id);
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskTitle('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onDropTask(taskId, id);
    }
  };

  const styles = columnStyles[id];

  return (
    <div
      className={cn(
        "flex-1 min-w-[280px] max-w-[320px] rounded-xl p-3 transition-all duration-200",
        styles.bg,
        isDragOver && "ring-2 ring-primary/30 ring-inset"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={cn("w-2 h-2 rounded-full", styles.accent)} />
        <h3 className="font-medium text-sm text-foreground">{label}</h3>
        <span className="text-xs text-muted-foreground bg-background/60 px-1.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-2 mb-2 min-h-[100px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onDragStart={(e) => {
              e.dataTransfer.setData('taskId', task.id);
            }}
          />
        ))}
      </div>

      {/* Add Task */}
      {isAddingTask ? (
        <div className="animate-fade-in">
          <Input
            placeholder="Task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!newTaskTitle.trim()) {
                setIsAddingTask(false);
              }
            }}
            autoFocus
            className="h-9 text-sm bg-card"
          />
        </div>
      ) : (
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground h-9"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Add task</span>
        </Button>
      )}
    </div>
  );
}
