<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui'

  import { commandVariants } from './variants'
  import { ComboboxContent, useForwardProps } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<ComboboxContentEmits>()

  interface Props extends Omit<ComboboxContentProps, 'position'> {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardProps(props)
  const slots = commandVariants()

  function preventDismiss(event: Event) {
    event.preventDefault()
  }
</script>

<template>
  <ComboboxContent
    v-bind="{ ...$attrs, ...forwarded }"
    :class="slots.list({ class: props.class as never })"
    position="inline"
    data-slot="command-list"
    @escape-key-down="(event) => {
      preventDismiss(event)
      emit('escapeKeyDown', event)
    }"
    @focus-outside="(event) => {
      preventDismiss(event)
      emit('focusOutside', event)
    }"
    @interact-outside="(event) => {
      preventDismiss(event)
      emit('interactOutside', event)
    }"
    @pointer-down-outside="(event) => {
      preventDismiss(event)
      emit('pointerDownOutside', event)
    }"
  >
    <slot />
  </ComboboxContent>
</template>
