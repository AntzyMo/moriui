<script setup lang="ts">
  import {
    Button,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from 'moriui'

  const sheetSides = [
    { side: 'right', label: '打开右侧面板' },
    { side: 'left', label: '打开左侧面板' },
    { side: 'top', label: '打开顶部面板' },
    { side: 'bottom', label: '打开底部面板' }
  ] as const
</script>

<template>
  <section class="playground__section">
    <h2>Sheet</h2>
    <div class="flex flex-wrap gap-3">
      <Sheet v-for="{ side, label } in sheetSides" :key="side">
        <SheetTrigger as-child>
          <Button variant="outline">
            {{ label }}
          </Button>
        </SheetTrigger>
        <SheetContent :side="side">
          <SheetHeader>
            <SheetTitle>编辑项目</SheetTitle>
            <SheetDescription>
              Sheet 提供标准侧边面板交互，支持键盘、遮罩和关闭按钮。
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button>保存更改</Button>
            <SheetClose as-child>
              <Button variant="outline">
                取消
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  </section>
</template>
