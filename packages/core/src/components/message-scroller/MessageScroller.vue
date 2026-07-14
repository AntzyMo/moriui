<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { messageScrollerVariants } from './variants'
  import { useMessageScrollerContext } from './useMessageScroller'
  import { computed, onBeforeUnmount, shallowRef, watch } from 'vue'

  interface Props { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const { setRootElement } = useMessageScrollerContext()
  const slots = computed(() => messageScrollerVariants())
  const root = shallowRef<HTMLElement>()

  watch(() => root.value, element => setRootElement(element ?? null), { flush: 'post' })
  onBeforeUnmount(() => setRootElement(null))
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    :class="slots.root({ class: props.class as never })"
    data-slot="message-scroller"
  >
    <slot />
  </div>
</template>
