<script setup lang="ts">
  import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'moriui'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button size="sm" variant="outline">打开</Button>
    </SheetTrigger><SheetContent><SheetHeader><SheetTitle>侧边面板</SheetTitle></SheetHeader></SheetContent>
  </Sheet>
</template>
