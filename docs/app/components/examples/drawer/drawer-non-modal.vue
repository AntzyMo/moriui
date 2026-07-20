<script setup lang="ts">
import { ref } from 'vue'
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from 'moriui'

const open = ref(false)
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Drawer v-model:open="open" :modal="false">
      <DrawerTrigger as-child>
        <Button variant="outline">非模态抽屉</Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>非模态抽屉</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          非模态抽屉不阻挡背景交互，你可以继续与页面上的其他元素进行互动。
        </div>
      </DrawerContent>
    </Drawer>
    <p class="text-xs text-muted-foreground">
      抽屉已{{ open ? '打开' : '关闭' }}，背景按钮仍可点击
    </p>
  </div>
</template>
