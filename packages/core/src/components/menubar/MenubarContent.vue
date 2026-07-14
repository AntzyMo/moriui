<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarContentProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarContent, MenubarPortal, useForwardProps } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  interface Props extends MenubarContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="menubar-content"
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>
