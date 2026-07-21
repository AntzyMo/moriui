<script setup lang="ts">
  import { HoverCard, HoverCardContent, HoverCardTrigger } from 'moriui'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <a class="text-sm underline underline-offset-4" href="#">@用户</a>
    </HoverCardTrigger>
    <HoverCardContent class="w-64">
      简介
    </HoverCardContent>
  </HoverCard>
</template>
