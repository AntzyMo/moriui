<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { USER_SCROLL_KEYS } from './types'
  import { messageScrollerVariants } from './variants'
  import { useMessageScrollerContext } from './useMessageScroller'
  import { computed, onBeforeUnmount, shallowRef, useAttrs, watch } from 'vue'

  interface Props {
    class?: HTMLAttributes['class']
    preserveScrollOnPrepend?: boolean
  }

  const props = withDefaults(defineProps<Props>(), { preserveScrollOnPrepend: true })
  const { setPreserveScrollOnPrepend, setViewportElement, syncAfterScroll, userScrollIntent } = useMessageScrollerContext()
  const slots = computed(() => messageScrollerVariants())
  const viewport = shallowRef<HTMLElement>()
  const attrs = useAttrs()
  const ariaLabel = computed(() => typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : '消息')
  const role = computed(() => typeof attrs.role === 'string' ? attrs.role : 'region')
  const tabIndex = computed(() => typeof attrs.tabindex === 'string' || typeof attrs.tabindex === 'number' ? attrs.tabindex : 0)

  watch(() => props.preserveScrollOnPrepend, setPreserveScrollOnPrepend, { immediate: true })
  watch(() => viewport.value, element => setViewportElement(element ?? null), { flush: 'post' })
  onBeforeUnmount(() => setViewportElement(null))

  function onScroll() {
    syncAfterScroll()
  }

  function onWheel() {
    userScrollIntent()
  }

  function onTouchMove() {
    userScrollIntent()
  }

  function onKeyDown(event: KeyboardEvent) {
    if (USER_SCROLL_KEYS.has(event.key))
      userScrollIntent()
  }
</script>

<template>
  <div
    ref="viewport"
    v-bind="attrs"
    :class="slots.viewport({ class: props.class as never })"
    :aria-label="ariaLabel"
    data-slot="message-scroller-viewport"
    :role="role"
    :tabindex="tabIndex"
    @keydown="onKeyDown"
    @scroll="onScroll"
    @touchmove="onTouchMove"
    @wheel="onWheel"
  >
    <slot />
  </div>
</template>
