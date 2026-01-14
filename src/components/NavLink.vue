<template>
  <a
    :href="href"
    :class="[
      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    ]"
  >
    <component :is="icon" class="w-4 h-4" />
    <span>{{ label }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  href: string
  label: string
  icon: any
  isActive?: boolean
}>()
</script>
