<script setup lang="ts">
  import {
    Button,
    Kbd,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
  } from 'moriui'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">
          格式化
        </Button>
      </TooltipTrigger><TooltipContent>格式化文档 <Kbd>⌥ ⇧ F</Kbd></TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
