<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4">
    <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
      <Inbox class="w-8 h-8 text-muted-foreground" />
    </div>
    <div class="text-center">
      <h2 class="text-lg font-semibold text-foreground">No project selected</h2>
      <p class="text-sm text-muted-foreground">
        Select a project from the sidebar to get started
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'
</script>
