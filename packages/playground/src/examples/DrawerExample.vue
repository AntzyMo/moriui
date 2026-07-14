<script setup lang="ts">
  import { shallowRef } from 'vue'
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

  const activeSnapPoint = shallowRef<number | null>(0.4)
</script>

<template>
  <section class="playground__section">
    <h2>Drawer</h2>
    <div class="flex flex-wrap gap-3">
      <Drawer>
        <DrawerTrigger as-child>
          <Button variant="outline">
            打开底部抽屉
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>移动端操作</DrawerTitle>
            <DrawerDescription>
              Drawer 默认从底部出现，可拖拽关闭，也支持键盘和遮罩关闭。
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>保存更改</Button>
            <DrawerClose as-child>
              <Button variant="outline">
                取消
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer swipe-direction="right">
        <DrawerTrigger as-child>
          <Button variant="outline">
            打开右侧抽屉
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>选择配送时间</DrawerTitle>
            <DrawerDescription>我们会尽快为你准备订单。</DrawerDescription>
          </DrawerHeader>
          <div class="flex flex-col gap-2 px-4 pt-4">
            <button
              v-for="time in ['标准配送 · 25–35 分钟', '17:00–17:15', '17:30–17:45', '18:00–18:15', '18:30–18:45']"
              :key="time"
              class="flex min-h-16 items-center rounded-xl border border-border px-4 text-left text-sm hover:bg-muted"
              type="button"
            >
              {{ time }}
            </button>
          </div>
          <DrawerFooter>
            <Button>确认配送时间</Button>
            <DrawerClose as-child>
              <Button variant="outline">
                取消
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer v-model:snap-point="activeSnapPoint" :snap-points="[0.4, 0.75, 1]">
        <DrawerTrigger as-child>
          <Button variant="outline">
            打开吸附点抽屉
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>吸附点</DrawerTitle>
            <DrawerDescription>
              当前吸附点：{{ activeSnapPoint ?? '未设置' }}。
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  </section>
</template>
