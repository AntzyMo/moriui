<script setup lang="ts">
  import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'moriui'

  const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <TooltipProvider>
    <div class="flex flex-wrap gap-2">
      <Tooltip v-for="side in sides" :key="side">
        <TooltipTrigger as-child>
          <Button variant="outline" class="w-fit capitalize">
            {{ side }}
          </Button>
        </TooltipTrigger>
        <TooltipContent :side="side">
          <p>添加到收藏夹</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
