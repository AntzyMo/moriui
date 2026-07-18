<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Avatar, AvatarFallback, Button, Input } from 'moriui'

  const message = shallowRef('把组件文档整理成一条清晰路径')
</script>

<template>
  <div class="mx-auto grid max-w-xl gap-5 rounded-xl bg-background p-5">
    <div class="flex gap-3">
      <Avatar><AvatarFallback>MO</AvatarFallback></Avatar>
      <div class="rounded-xl bg-muted px-4 py-3 text-sm leading-6">
        先从真实示例开始，再按需查看 API。
      </div>
    </div>
    <div class="grid gap-2 sm:grid-cols-[1fr_auto]">
      <Input v-model="message" aria-label="消息" />
      <Button>发送</Button>
    </div>
  </div>
</template>
