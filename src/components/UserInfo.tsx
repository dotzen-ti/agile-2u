import { LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface UserInfoProps {
  isCollapsed: boolean;
}

// Mock user data - would come from auth in real app
const MOCK_USER = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  avatar: '',
  initials: 'JS',
};

export function UserInfo({ isCollapsed }: UserInfoProps) {
  return (
    <div className="p-3 border-t border-sidebar-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full h-auto p-2 justify-start hover:bg-sidebar-accent",
              isCollapsed && "justify-center px-0"
            )}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {MOCK_USER.initials}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-2 flex flex-col items-start text-left overflow-hidden">
                <span className="text-sm font-medium text-sidebar-foreground truncate w-full">
                  {MOCK_USER.name}
                </span>
                <span className="text-xs text-muted-foreground truncate w-full">
                  {MOCK_USER.email}
                </span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{MOCK_USER.name}</p>
            <p className="text-xs text-muted-foreground">{MOCK_USER.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
