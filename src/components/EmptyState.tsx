import { FolderKanban, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateProject: () => void;
}

export function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <FolderKanban className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          No project selected
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-[280px]">
          Select a project from the sidebar or create a new one to get started.
        </p>
        <Button onClick={onCreateProject} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>
    </div>
  );
}
