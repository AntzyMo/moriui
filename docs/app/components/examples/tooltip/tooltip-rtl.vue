<script setup lang="ts">
import { DirectionProvider, Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'moriui'
</script>
<template>
  <DirectionProvider dir="rtl">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">تلميح</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>إضافة إلى المفضلة</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </DirectionProvider>
</template>
