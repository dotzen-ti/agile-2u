<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
    <div class="w-full max-w-lg h-[600px] bg-card rounded-xl shadow-2xl flex flex-col animate-scale-in border border-border">
      <!-- Header -->
      <div class="h-14 px-4 flex items-center justify-between border-b border-border">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-500" />
          <span class="font-semibold text-foreground">Chat Geral</span>
          <span class="text-xs text-muted-foreground">3 online</span>
        </div>
        <button
          @click="$emit('close')"
          class="h-8 w-8 text-muted-foreground hover:text-foreground flex items-center justify-center rounded hover:bg-muted"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <!-- Messages -->
      <div ref="scrollContainer" class="flex-1 overflow-y-auto p-4">
        <div class="space-y-4">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex flex-col max-w-[80%]',
              message.sender === 'user' ? 'ml-auto items-end' : 'items-start',
            ]"
          >
            <span class="text-xs text-muted-foreground mb-1">
              {{ message.senderName }}
            </span>
            <div
              :class="[
                'px-3 py-2 rounded-lg text-sm',
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground',
              ]"
            >
              {{ message.text }}
            </div>
            <span class="text-[10px] text-muted-foreground mt-1">
              {{ formatTime(message.timestamp) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 border-t border-border">
        <div class="flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Digite sua mensagem..."
            @keydown="handleKeyDown"
            class="flex-1 px-3 py-2 rounded border border-border"
          />
          <button
            @click="handleSendMessage"
            :disabled="!newMessage.trim()"
            class="px-3 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
          >
            <Send class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Send, X } from 'lucide-vue-next'

interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: Date
  senderName: string
}

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

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
]

const messages = ref<Message[]>(MOCK_MESSAGES)
const newMessage = ref('')
const scrollContainer = ref<HTMLDivElement>()

watch(
  () => messages.value,
  async () => {
    await nextTick()
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }
  },
  { deep: true }
)

const handleSendMessage = () => {
  if (newMessage.value.trim()) {
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.value.trim(),
      sender: 'user',
      timestamp: new Date(),
      senderName: 'Você',
    }
    messages.value.push(message)
    newMessage.value = ''
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSendMessage()
  }
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
</script>
