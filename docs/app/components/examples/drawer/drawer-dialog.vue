<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from 'moriui'

const isDesktop = ref(false)
</script>

<template>
  <div class="flex items-center gap-4">
    <Drawer v-if="!isDesktop">
      <DrawerTrigger as-child>
        <Button variant="outline">响应式抽屉</Button>
      </DrawerTrigger>
      <DrawerContent show-handle>
        <DrawerHeader>
          <DrawerTitle>编辑资料</DrawerTitle>
          <DrawerDescription>在移动端使用抽屉模式。</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>保存</Button>
          <DrawerClose as-child>
            <Button variant="outline">取消</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

    <Dialog v-else>
      <DialogTrigger as-child>
        <Button variant="outline">响应式对话框</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>在桌面端使用对话框模式。</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>保存</Button>
          <Button variant="outline">取消</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <label class="flex items-center gap-2 text-sm">
      <input v-model="isDesktop" type="checkbox" class="toggle" />
      桌面端模式
    </label>
  </div>
</template>
