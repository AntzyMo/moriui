<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuContentEmits, ContextMenuContentProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuContent, ContextMenuPortal, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<ContextMenuContentEmits>()

  interface Props extends ContextMenuContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="context-menu-content"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
