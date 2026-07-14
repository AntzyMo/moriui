<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarSubContentEmits, MenubarSubContentProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarPortal, MenubarSubContent, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<MenubarSubContentEmits>()

  interface Props extends MenubarSubContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = menubarVariants()
</script>

<template>
  <MenubarPortal>
    <MenubarSubContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="menubar-sub-content"
    >
      <slot />
    </MenubarSubContent>
  </MenubarPortal>
</template>
