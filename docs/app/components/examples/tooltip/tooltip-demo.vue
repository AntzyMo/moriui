<script setup lang="ts">
  import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'moriui'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">
          悬停
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>添加到收藏夹</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
