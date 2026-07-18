<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Bubble,
    BubbleContent,
    BubbleGroup
  } from 'moriui'

  const expanded = ref(false)
</script>

<template>
  <BubbleGroup class="w-full max-w-md">
    <Bubble><BubbleContent>默认消息</BubbleContent></Bubble><Bubble variant="secondary">
      <BubbleContent>次要消息</BubbleContent>
    </Bubble><Bubble variant="outline">
      <BubbleContent>描边消息</BubbleContent>
    </Bubble><Bubble variant="destructive">
      <BubbleContent>发送失败</BubbleContent>
    </Bubble>
  </BubbleGroup>
</template>
