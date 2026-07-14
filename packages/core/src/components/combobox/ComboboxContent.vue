<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxContent, ComboboxPortal, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<ComboboxContentEmits>()

  interface Props extends Omit<ComboboxContentProps, 'position'> {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="combobox-content"
      position="popper"
    >
      <slot />
    </ComboboxContent>
  </ComboboxPortal>
</template>
