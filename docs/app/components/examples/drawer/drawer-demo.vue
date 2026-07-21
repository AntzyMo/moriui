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
    DrawerTrigger,
    Input,
    Label
  } from 'moriui'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">
        编辑资料
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>编辑资料</DrawerTitle>
        <DrawerDescription>在此修改你的资料，完成后点击保存。</DrawerDescription>
      </DrawerHeader>
      <div class="grid gap-4 p-4">
        <div class="grid gap-2">
          <Label for="drawer-name">姓名</Label>
          <Input id="drawer-name" default-value="张三" />
        </div>
        <div class="grid gap-2">
          <Label for="drawer-username">用户名</Label>
          <Input id="drawer-username" default-value="@zhangsan" />
        </div>
      </div>
      <DrawerFooter>
        <Button type="submit">
          保存
        </Button>
        <DrawerClose as-child>
          <Button variant="outline">
            取消
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
