<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AttachmentMediaVariants } from './variants'

  import { attachmentVariants } from './variants'

  interface Props {
    variant?: AttachmentMediaVariants['variant']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'icon'
  })
  const slots = attachmentVariants()
</script>

<template>
  <div
    :class="slots.media({ variant, class: props.class as never })"
    :data-variant="variant"
    data-slot="attachment-media"
  >
    <slot />
  </div>
</template>
