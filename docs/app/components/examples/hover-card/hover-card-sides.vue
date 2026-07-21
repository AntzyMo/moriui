<script setup lang="ts">
  import { HoverCard, HoverCardContent, HoverCardTrigger } from 'moriui'

  const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <HoverCard v-for="side in sides" :key="side" :open-delay="0">
      <HoverCardTrigger as-child>
        <a class="underline underline-offset-4 capitalize" href="#">{{ side }}</a>
      </HoverCardTrigger>
      <HoverCardContent :side="side" class="w-64">
        <p class="text-sm">
          {{ side }} 方向的悬浮卡片
        </p>
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
