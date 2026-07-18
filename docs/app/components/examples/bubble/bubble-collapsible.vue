<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Bubble,
    BubbleContent,
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
  } from 'moriui'

  const expanded = ref(false)
</script>

<template>
  <Collapsible v-model:open="expanded" class="w-full max-w-md">
    <Bubble variant="muted">
      <BubbleContent>
        这是一段较长的会话摘要。<CollapsibleContent><span class="block pt-2">展开后显示补充细节，并保留清晰的阅读层级。</span></CollapsibleContent><CollapsibleTrigger as-child>
          <Button class="mt-2" size="xs" variant="ghost">
            {{ expanded ? '收起' : '显示更多' }}
          </Button>
        </CollapsibleTrigger>
      </BubbleContent>
    </Bubble>
  </Collapsible>
</template>
