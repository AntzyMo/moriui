<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Button, Textarea } from 'moriui'

  const message = shallowRef('')

  function sendMessage() {
    message.value = ''
  }
</script>

<template>
  <div class="grid w-full max-w-xs gap-2">
    <Textarea v-model="message" aria-label="消息" placeholder="在这里输入消息…" />
    <Button type="button" :disabled="!message.trim()" @click="sendMessage">
      发送消息
    </Button>
  </div>
</template>
