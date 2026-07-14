<script setup lang="ts">
  import type { MessageScrollerDefaultScrollPosition } from './types'

  import { provide } from 'vue'
  import { useMessageScrollerController } from './useMessageScrollerController'
  import {
    DEFAULT_SCROLL_EDGE_THRESHOLD,
    DEFAULT_SCROLL_MARGIN,
    DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
    messageScrollerContextKey
  } from './types'

  interface Props {
    autoScroll?: boolean
    defaultScrollPosition?: MessageScrollerDefaultScrollPosition
    scrollEdgeThreshold?: number
    scrollPreviousItemPeek?: number
    scrollMargin?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    autoScroll: false,
    defaultScrollPosition: 'end',
    scrollEdgeThreshold: DEFAULT_SCROLL_EDGE_THRESHOLD,
    scrollPreviousItemPeek: DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
    scrollMargin: DEFAULT_SCROLL_MARGIN
  })

  const context = useMessageScrollerController(props)
  provide(messageScrollerContextKey, context)

  defineExpose({
    scrollable: context.scrollable,
    visibility: context.visibility,
    scrollToStart: context.scrollToStart,
    scrollToEnd: context.scrollToEnd,
    scrollToMessage: context.scrollToMessage
  })
</script>

<template>
  <slot />
</template>
