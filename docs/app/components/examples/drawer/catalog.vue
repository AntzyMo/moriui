<script setup lang="ts">
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from 'moriui'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button size="sm" variant="outline">
        打开
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>抽屉</DrawerTitle>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
</template>
