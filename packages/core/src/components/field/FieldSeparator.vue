<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { useSlots } from 'vue'
  import { fieldVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const componentSlots = useSlots()
  const slots = fieldVariants()
</script>

<template>
  <div
    :class="slots.separator({ class: props.class as never })"
    :data-content="Boolean(componentSlots.default)"
    data-slot="field-separator"
    role="separator"
  >
    <span
      v-if="componentSlots.default"
      :class="slots.separatorContent()"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>
