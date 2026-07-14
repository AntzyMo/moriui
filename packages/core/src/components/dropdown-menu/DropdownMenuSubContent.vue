<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuPortal, DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<DropdownMenuSubContentEmits>()

  interface Props extends DropdownMenuSubContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="dropdown-menu-sub-content"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
