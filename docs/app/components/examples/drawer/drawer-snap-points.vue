<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Button,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
  } from 'moriui'

  const snap = ref(0.5)
</script>

<template>
  <Drawer v-model:snap-point="snap" :snap-points="[0.25, 0.5, 0.85]">
    <DrawerTrigger as-child>
      <Button variant="outline">
        吸附点抽屉
      </Button>
    </DrawerTrigger>
    <DrawerContent show-handle>
      <DrawerHeader>
        <DrawerTitle>吸附点</DrawerTitle>
      </DrawerHeader>
      <div class="p-4 text-sm text-muted-foreground">
        当前吸附位置：{{ Math.round(snap * 100) }}%
      </div>
      <div class="px-4 pb-4 text-sm text-muted-foreground">
        拖拽抽屉到不同位置会吸附到预设的点位（25%、50%、85%）。
      </div>
    </DrawerContent>
  </Drawer>
</template>
