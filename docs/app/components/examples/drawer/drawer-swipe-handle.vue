<script setup lang="ts">
import { ref } from 'vue'
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from 'moriui'

const showHandle = ref(true)
</script>

<template>
  <div class="flex items-center gap-4">
    <Drawer>
      <DrawerTrigger as-child>
        <Button variant="outline">有拖拽手柄</Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>拖拽手柄</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          顶部拖拽手柄可以让你通过拖拽关闭抽屉。
        </div>
      </DrawerContent>
    </Drawer>

    <Drawer>
      <DrawerTrigger as-child>
        <Button variant="outline">无拖拽手柄</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>无手柄</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          通过传递 <code>show-handle</code> prop 控制手柄显隐。
        </div>
      </DrawerContent>
    </Drawer>
  </div>
</template>
