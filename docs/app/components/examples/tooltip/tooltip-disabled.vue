<script setup lang="ts">
  import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'moriui'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <span tabindex="0">
          <Button disabled variant="outline">不能点击</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>此功能暂不可用</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
