<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { messageScrollerVariants } from './variants'
  import { useMessageScrollerContext } from './useMessageScroller'
  import { computed, onBeforeUnmount, shallowRef, useAttrs, watch } from 'vue'

  interface Props {
    class?: HTMLAttributes['class']
    spacerClass?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const { setContentElement, setSpacerElement } = useMessageScrollerContext()
  const slots = computed(() => messageScrollerVariants())
  const content = shallowRef<HTMLElement>()
  const spacer = shallowRef<HTMLElement>()
  const attrs = useAttrs()
  const ariaRelevant = computed(() => {
    const value = attrs['aria-relevant']
    return typeof value === 'string' ? value as 'additions' | 'removals' | 'text' | 'all' | 'additions removals' | 'additions text' | 'removals additions' | 'removals text' | 'text additions' | 'text removals' : 'additions'
  })
  const role = computed(() => typeof attrs.role === 'string' ? attrs.role : 'log')
  watch(() => content.value, element => setContentElement(element ?? null), { flush: 'post' })
  watch(() => spacer.value, element => setSpacerElement(element ?? null), { flush: 'post' })
  onBeforeUnmount(() => {
    setSpacerElement(null)
    setContentElement(null)
  })
</script>

<template>
  <div
    ref="content"
    v-bind="attrs"
    :class="slots.content({ class: props.class as never })"
    :aria-relevant="ariaRelevant"
    data-slot="message-scroller-content"
    :role="role"
  >
    <slot />
    <div
      ref="spacer"
      :class="slots.spacer({ class: props.spacerClass as never })"
      aria-hidden="true"
      data-message-scroller-spacer=""
      data-slot="message-scroller-spacer"
      hidden
    />
  </div>
</template>
