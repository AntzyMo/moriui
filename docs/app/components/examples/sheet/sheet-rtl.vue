<script setup lang="ts">
  import {
    Button,
    DirectionProvider,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from 'moriui'
</script>

<template>
  <DirectionProvider direction="rtl">
    <Sheet dir="rtl">
      <SheetTrigger as-child>
        <Button variant="outline">
          فتح
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>لوحة جانبية</SheetTitle>
        </SheetHeader>
        <p class="text-sm text-muted-foreground px-4">
          اتجاه المحتوى من اليمين إلى اليسار.
        </p>
      </SheetContent>
    </Sheet>
  </DirectionProvider>
</template>
