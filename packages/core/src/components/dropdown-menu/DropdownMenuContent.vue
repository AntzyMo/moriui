<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<DropdownMenuContentEmits>()

  interface Props extends DropdownMenuContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="dropdown-menu-content"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
