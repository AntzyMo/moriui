<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SeparatorProps } from 'reka-ui'

  import { computed, inject } from 'vue'
  import { Separator, useForwardProps } from 'reka-ui'

  import { buttonGroupVariants } from './variants'
  import { buttonGroupContextKey } from './context'

  interface Props extends SeparatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const context = inject(buttonGroupContextKey, null)
  const orientation = computed(() => props.orientation ?? (context?.orientation.value === 'vertical' ? 'horizontal' : 'vertical'))
  const slots = computed(() => buttonGroupVariants({ orientation: context?.orientation.value }))
</script>

<template>
  <Separator
    v-bind="forwarded"
    :class="slots.separator({ class: props.class as never })"
    :orientation="orientation"
    data-slot="button-group-separator"
  >
    <slot />
  </Separator>
</template>
