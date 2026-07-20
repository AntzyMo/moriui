<script setup lang="ts">
  import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'moriui'

  const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Sheet v-for="side in sides" :key="side">
      <SheetTrigger as-child>
        <Button variant="outline" class="capitalize">{{ side }}</Button>
      </SheetTrigger>
      <SheetContent :side="side">
        <SheetHeader>
          <SheetTitle class="capitalize">{{ side }} 面板</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  </div>
</template>
