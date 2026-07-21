<script setup lang="ts">
  import {
    Button,
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
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">
        打开嵌套抽屉
      </Button>
    </DrawerTrigger>
    <DrawerContent show-handle>
      <DrawerHeader>
        <DrawerTitle>主抽屉</DrawerTitle>
        <DrawerDescription>这是第一层抽屉，你可以在其中打开第二个抽屉。</DrawerDescription>
      </DrawerHeader>
      <div class="p-4">
        <Drawer>
          <DrawerTrigger as-child>
            <Button>打开二级抽屉</Button>
          </DrawerTrigger>
          <DrawerContent show-handle>
            <DrawerHeader>
              <DrawerTitle>二级抽屉</DrawerTitle>
              <DrawerDescription>这是嵌套在第一个抽屉内部的第二个抽屉。</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline">
                  关闭
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </DrawerContent>
  </Drawer>
</template>
