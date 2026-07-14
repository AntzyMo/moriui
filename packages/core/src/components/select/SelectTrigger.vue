<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectTriggerProps } from 'reka-ui'

  import { ChevronDown } from '@lucide/vue'
  import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'

  import { selectVariants } from './variants'

  interface Props extends SelectTriggerProps {
    size?: 'sm' | 'default'
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), { size: 'default' })
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    :data-size="size"
    data-slot="select-trigger"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown
        :class="slots.triggerIcon()"
        aria-hidden="true"
        data-slot="select-trigger-icon"
      />
    </SelectIcon>
  </SelectTrigger>
</template>
