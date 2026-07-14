<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectContentEmits, SelectContentProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectContent, SelectPortal, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), {
    align: 'center',
    position: 'popper',
    side: 'bottom',
    sideOffset: 4
  })

  const emit = defineEmits<SelectContentEmits>()

  interface Props extends SelectContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = selectVariants()
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      data-slot="select-content"
    >
      <slot />
    </SelectContent>
  </SelectPortal>
</template>
