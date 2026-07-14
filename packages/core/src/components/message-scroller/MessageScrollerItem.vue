<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { messageScrollerVariants } from './variants'
  import { useMessageScrollerContext } from './useMessageScroller'
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

  interface Props {
    class?: HTMLAttributes['class']
    messageId?: string
    scrollAnchor?: boolean
  }

  const props = withDefaults(defineProps<Props>(), { scrollAnchor: false })
  const { registerMessage } = useMessageScrollerContext()
  const element = ref<HTMLElement | null>(null)
  const slots = computed(() => messageScrollerVariants())

  function register() {
    if (props.messageId)
      registerMessage(props.messageId, element.value)
  }

  onMounted(register)
  watch(() => props.messageId, (next, previous) => {
    if (previous)
      registerMessage(previous, null, element.value)
    if (next)
      register()
  })
  onBeforeUnmount(() => {
    if (props.messageId)
      registerMessage(props.messageId, null, element.value)
  })
</script>

<template>
  <div
    ref="element"
    v-bind="$attrs"
    :class="slots.item({ class: props.class as never })"
    :data-message-id="messageId"
    :data-scroll-anchor="scrollAnchor ? 'true' : 'false'"
    data-slot="message-scroller-item"
  >
    <slot />
  </div>
</template>
