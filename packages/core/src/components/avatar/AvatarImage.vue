<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AvatarImageEmits, AvatarImageProps } from 'reka-ui'

  import { avatarVariants } from './variants'
  import { AvatarImage, useForwardPropsEmits } from 'reka-ui'

  interface Props extends AvatarImageProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emits = defineEmits<AvatarImageEmits>()
  const forwarded = useForwardPropsEmits(props, emits)
  const slots = avatarVariants()
</script>

<template>
  <AvatarImage
    v-bind="forwarded"
    :class="slots.image({ class: props.class as never })"
    data-slot="avatar-image"
  >
    <slot />
  </AvatarImage>
</template>
