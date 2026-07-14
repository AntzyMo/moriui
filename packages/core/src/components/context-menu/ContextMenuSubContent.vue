<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from 'reka-ui'

  import { contextMenuVariants } from './variants'
  import { ContextMenuPortal, ContextMenuSubContent, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<ContextMenuSubContentEmits>()

  interface Props extends ContextMenuSubContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = contextMenuVariants()
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuSubContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="context-menu-sub-content"
    >
      <slot />
    </ContextMenuSubContent>
  </ContextMenuPortal>
</template>
