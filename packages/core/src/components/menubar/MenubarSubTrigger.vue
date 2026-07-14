<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarSubTriggerProps } from 'reka-ui'

  import { ChevronRight } from '@lucide/vue'
  import { MenubarSubTrigger, useForwardProps } from 'reka-ui'

  import { menubarVariants } from './variants'

  interface Props extends MenubarSubTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = menubarVariants()
</script>

<template>
  <MenubarSubTrigger
    v-bind="forwarded"
    :class="slots.subTrigger({ class: props.class as never })"
    data-slot="menubar-sub-trigger"
  >
    <slot />
    <slot name="indicator">
      <ChevronRight
        :class="slots.subTriggerIcon()"
        aria-hidden="true"
        data-slot="menubar-sub-trigger-icon"
      />
    </slot>
  </MenubarSubTrigger>
</template>
