<script setup lang="ts">
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'moriui'
</script>
<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child><Button size="sm" variant="outline">悬停</Button></TooltipTrigger>
      <TooltipContent>提示文字</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
