<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AvatarFallbackProps } from 'reka-ui'

  import { avatarVariants } from './variants'
  import { AvatarFallback, useForwardProps } from 'reka-ui'

  interface Props extends AvatarFallbackProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = avatarVariants()
</script>

<template>
  <AvatarFallback
    v-bind="forwarded"
    :class="slots.fallback({ class: props.class as never })"
    data-slot="avatar-fallback"
  >
    <slot />
  </AvatarFallback>
</template>
