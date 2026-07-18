<script setup lang="ts">
  import { ref } from 'vue'
  import { Heart, Reply } from '@lucide/vue'
  import {
    Bubble,
    BubbleContent,
    BubbleReactions,
    Button
  } from 'moriui'

  const expanded = ref(false)
</script>

<template>
  <Bubble>
    <BubbleContent>这套交互很清晰。</BubbleContent><BubbleReactions aria-label="消息回应">
      <Button size="icon-xs" variant="ghost" aria-label="喜欢">
        <Heart class="size-3" />
      </Button><Button size="icon-xs" variant="ghost" aria-label="回复">
        <Reply class="size-3" />
      </Button>
    </BubbleReactions>
  </Bubble>
</template>
