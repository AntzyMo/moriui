<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Bubble,
    BubbleContent,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
  } from 'moriui'

  const expanded = ref(false)
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Bubble as="button" type="button">
          <BubbleContent>悬停查看时间</BubbleContent>
        </Bubble>
      </TooltipTrigger><TooltipContent>今天 13:48</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
