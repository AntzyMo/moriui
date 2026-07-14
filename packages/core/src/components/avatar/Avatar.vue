<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AvatarRootProps } from 'reka-ui'
  import type { AvatarVariants } from './variants'

  import { avatarVariants } from './variants'
  import { AvatarRoot, useForwardProps } from 'reka-ui'

  interface Props extends AvatarRootProps {
    size?: AvatarVariants['size']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'default'
  })
  const forwarded = useForwardProps(props)
  const slots = avatarVariants()
</script>

<template>
  <AvatarRoot
    v-bind="forwarded"
    :class="slots.base({ size, class: props.class as never })"
    :data-size="size"
    data-slot="avatar"
  >
    <slot />
  </AvatarRoot>
</template>
