<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input
  } from 'moriui'

  const dialogOpen = shallowRef(false)
</script>

<template>
  <section class="playground__section">
    <h2>Dialog</h2>
    <div class="playground__row">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            确认操作
          </Button>
        </DialogTrigger>
        <DialogContent :show-close-button="false">
          <DialogHeader>
            <DialogTitle>删除草稿？</DialogTitle>
            <DialogDescription>
              Nova Dialog 使用固定的紧凑宽度，适合需要确认的操作。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">
                取消
              </Button>
            </DialogClose>
            <Button variant="destructive">
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="outline" @click="dialogOpen = true">
        受控默认
      </Button>
      <Dialog v-model:open="dialogOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑个人资料</DialogTitle>
            <DialogDescription>
              该示例由外部的 <code>v-model:open</code> 控制。
            </DialogDescription>
          </DialogHeader>
          <Input value="MoriUI" aria-label="显示名称" />
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">
                取消
              </Button>
            </DialogClose>
            <Button @click="dialogOpen = false">
              保存更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </section>
</template>
