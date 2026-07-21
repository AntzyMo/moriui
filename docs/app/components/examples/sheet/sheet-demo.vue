<script setup lang="ts">
  import {
    Button,
    Input,
    Label,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from 'moriui'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">
        打开
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>编辑资料</SheetTitle>
        <SheetDescription>在此修改你的资料。</SheetDescription>
      </SheetHeader>
      <div class="grid flex-1 auto-rows-min gap-6 px-4">
        <div class="grid gap-3">
          <Label for="name">姓名</Label>
          <Input id="name" default-value="张三" />
        </div>
        <div class="grid gap-3">
          <Label for="username">用户名</Label>
          <Input id="username" default-value="@zhangsan" />
        </div>
      </div>
      <SheetFooter>
        <Button type="submit">
          保存
        </Button>
        <SheetClose as-child>
          <Button variant="outline">
            取消
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
