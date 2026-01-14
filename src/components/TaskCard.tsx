import { Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Task } from '@/types/project';

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent) => void;
}

const priorityStyles = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

export function TaskCard({ task, onDelete, onDragStart }: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={cn(
        "group bg-card rounded-lg p-3 shadow-card cursor-grab active:cursor-grabbing",
        "border border-border/50 hover:border-border hover:shadow-elevated",
        "transition-all duration-150 animate-scale-in"
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground font-medium leading-snug">
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide",
              priorityStyles[task.priority]
            )}>
              {task.priority}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive -mt-1 -mr-1"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
