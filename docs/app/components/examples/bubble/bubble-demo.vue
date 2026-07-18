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
    <Bubble><BubbleContent>今天的设计评审已准备好。</BubbleContent></Bubble><Bubble align="end" variant="secondary">
      <BubbleContent>收到，我会准时参加。</BubbleContent>
    </Bubble>
  </BubbleGroup>
</template>
