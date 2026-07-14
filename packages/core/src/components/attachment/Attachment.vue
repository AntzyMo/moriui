<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AttachmentState, AttachmentVariants } from './variants'

  import { computed } from 'vue'
  import { attachmentVariants } from './variants'

  interface Props {
    state?: AttachmentState
    size?: AttachmentVariants['size']
    orientation?: AttachmentVariants['orientation']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    state: 'done',
    size: 'default',
    orientation: 'horizontal'
  })
  const slots = computed(() => attachmentVariants({
    size: props.size,
    orientation: props.orientation
  }))
</script>

<template>
  <div
    :class="slots.base({ class: props.class as never })"
    :data-orientation="orientation"
    :data-size="size"
    :data-state="state"
    data-slot="attachment"
  >
    <slot />
  </div>
</template>
