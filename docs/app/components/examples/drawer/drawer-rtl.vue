<script setup lang="ts">
  import {
    Button,
    DirectionProvider,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
  } from 'moriui'
</script>

<template>
  <DirectionProvider direction="rtl">
    <Drawer dir="rtl">
      <DrawerTrigger as-child>
        <Button variant="outline">
          فتح الدرج
        </Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>درج من اليمين</DrawerTitle>
          <DrawerDescription>اتجاه المحتوى من اليمين إلى اليسار.</DrawerDescription>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          يدعم هذا الدرج الاتجاه من اليمين إلى اليسار للغات مثل العربية والعبرية.
        </div>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button variant="outline">
              إغلاق
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </DirectionProvider>
</template>
