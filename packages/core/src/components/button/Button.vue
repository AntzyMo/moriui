<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { ButtonVariants } from './variants'

  import { computed } from 'vue'
  import { Primitive } from 'reka-ui'

  import { buttonVariants } from './variants'

  interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    disabled?: boolean
    dataSlot?: string
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    variant: 'default',
    size: 'default',
    disabled: false
  })

  const isNativeButton = computed(() => props.as === 'button' && !props.asChild)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="buttonVariants({ variant, size, class: props.class as never })"
    :disabled="isNativeButton ? disabled : undefined"
    :data-slot="dataSlot ?? 'button'"
  >
    <slot />
  </Primitive>
</template>
