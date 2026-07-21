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

  const openBottom = ref(false)
  const openTop = ref(false)
  const openLeft = ref(false)
  const openRight = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Drawer v-model:open="openBottom" swipe-direction="down">
      <DrawerTrigger as-child>
        <Button variant="outline">
          底部
        </Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>底部抽屉</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          从底部滑入的抽屉，适合移动端操作。
        </div>
      </DrawerContent>
    </Drawer>

    <Drawer v-model:open="openTop" swipe-direction="up">
      <DrawerTrigger as-child>
        <Button variant="outline">
          顶部
        </Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>顶部抽屉</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          从顶部滑入的抽屉，适合通知或横幅。
        </div>
      </DrawerContent>
    </Drawer>

    <Drawer v-model:open="openLeft" swipe-direction="left">
      <DrawerTrigger as-child>
        <Button variant="outline">
          左侧
        </Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>左侧抽屉</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          从左侧滑入的抽屉，适合导航菜单。
        </div>
      </DrawerContent>
    </Drawer>

    <Drawer v-model:open="openRight" swipe-direction="right">
      <DrawerTrigger as-child>
        <Button variant="outline">
          右侧
        </Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>右侧抽屉</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 text-sm text-muted-foreground">
          从右侧滑入的抽屉，适合详情面板。
        </div>
      </DrawerContent>
    </Drawer>
  </div>
</template>
