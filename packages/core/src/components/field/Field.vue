<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { FieldVariants } from './variants'

  import { computed } from 'vue'
  import { fieldVariants } from './variants'

  interface Props {
    orientation?: FieldVariants['orientation']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    orientation: 'vertical'
  })
  const slots = computed(() => fieldVariants({ orientation: props.orientation }))
</script>

<template>
  <div
    :class="slots.base({ class: props.class as never })"
    :data-orientation="orientation"
    data-slot="field"
    role="group"
  >
    <slot />
  </div>
</template>
