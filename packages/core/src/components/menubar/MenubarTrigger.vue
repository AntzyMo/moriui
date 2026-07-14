<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarTriggerProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import {
    injectMenubarMenuContext,
    injectMenubarRootContext,
    MenubarTrigger,
    useForwardProps
  } from 'reka-ui'

  interface Props extends MenubarTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
  const rootContext = injectMenubarRootContext()
  const menuContext = injectMenubarMenuContext()

  function handlePointerMove() {
    if (
      props.disabled
      || !rootContext.modelValue.value
      || rootContext.modelValue.value === menuContext.value
    ) {
      return
    }

    rootContext.onMenuOpen(menuContext.value)
    menuContext.triggerElement.value?.focus()
  }
</script>

<template>
  <MenubarTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="menubar-trigger"
    @pointermove="handlePointerMove"
  >
    <slot />
  </MenubarTrigger>
</template>
