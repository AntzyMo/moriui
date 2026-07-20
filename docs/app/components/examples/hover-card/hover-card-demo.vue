<script setup lang="ts">
import { Calendar, HoverCard, HoverCardContent, HoverCardTrigger } from 'moriui'
</script>
<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <a class="underline underline-offset-4" href="https://github.com/example" target="_blank">@example</a>
    </HoverCardTrigger>
    <HoverCardContent class="w-80">
      <div class="flex gap-4">
        <img class="h-12 w-12 rounded-full" alt="@example" src="https://github.com/example.png" />
        <div class="grid gap-1">
          <p class="font-semibold">Example</p>
          <p class="text-sm text-muted-foreground">一个开源项目</p>
          <div class="flex items-center gap-1">
            <span class="text-xs text-muted-foreground">加入于 2024 年 1 月</span>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <Calendar :month="new Date()" />
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
