<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarRootProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import { MenubarRoot, useForwardPropsEmits } from 'reka-ui'

  interface Props extends MenubarRootProps {
    class?: HTMLAttributes['class']
  }

  interface Emits {
    'update:modelValue': [value: string]
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const forwarded = useForwardPropsEmits(props, emit) as MenubarRootProps
  const slots = menubarVariants()
</script>

<template>
  <MenubarRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="slots.root({ class: props.class as never })"
    data-slot="menubar"
  >
    <slot v-bind="slotProps" />
  </MenubarRoot>
</template>
