<script setup lang="ts">
  import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'moriui'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">无关闭按钮</Button>
    </SheetTrigger>
    <SheetContent show-close-button="false">
      <SheetHeader>
        <SheetTitle>无关闭按钮</SheetTitle>
      </SheetHeader>
      <p class="text-sm text-muted-foreground px-4">用户必须通过其他操作关闭此面板。</p>
    </SheetContent>
  </Sheet>
</template>
