import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  senderName: string;
}

interface GeneralChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Olá pessoal! Como estão os projetos?',
    sender: 'other',
    timestamp: new Date(Date.now() - 3600000),
    senderName: 'Maria Silva',
  },
  {
    id: '2',
    text: 'Tudo ótimo! Finalizando o sprint atual.',
    sender: 'user',
    timestamp: new Date(Date.now() - 3000000),
    senderName: 'Você',
  },
  {
    id: '3',
    text: 'Excelente! Precisando de ajuda é só chamar.',
    sender: 'other',
    timestamp: new Date(Date.now() - 2400000),
    senderName: 'João Santos',
  },
];

export function GeneralChat({ isOpen, onClose }: GeneralChatProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date(),
        senderName: 'Você',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="w-full max-w-lg h-[600px] bg-card rounded-xl shadow-2xl flex flex-col animate-scale-in border border-border">
        {/* Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-semibold text-foreground">Chat Geral</span>
            <span className="text-xs text-muted-foreground">3 online</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col max-w-[80%]",
                  message.sender === 'user' ? "ml-auto items-end" : "items-start"
                )}
              >
                <span className="text-xs text-muted-foreground mb-1">
                  {message.senderName}
                </span>
                <div
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {message.text}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
