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
    <Bubble variant="muted">
      <BubbleContent>第一条连续消息</BubbleContent>
    </Bubble><Bubble variant="muted">
      <BubbleContent>第二条连续消息</BubbleContent>
    </Bubble>
  </BubbleGroup>
</template>
