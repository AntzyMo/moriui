<script setup lang="ts">
import { Button, Kbd, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'moriui'
</script>
<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">收藏</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div class="flex items-center gap-2">
          <span>收藏</span>
          <Kbd>⌘B</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
