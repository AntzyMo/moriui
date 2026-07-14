<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxGroupProps } from 'reka-ui'

  import { computed } from 'vue'
  import { ComboboxGroup, ComboboxLabel, useForwardProps } from 'reka-ui'

  import { commandVariants } from './variants'

  interface Props extends ComboboxGroupProps {
    class?: HTMLAttributes['class']
    heading?: string
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(computed(() => {
    const { heading: _, ...rekaProps } = props
    return rekaProps
  }))
  const slots = commandVariants()
</script>

<template>
  <ComboboxGroup
    v-bind="forwarded"
    :class="slots.group({ class: props.class as never })"
    data-slot="command-group"
  >
    <ComboboxLabel
      v-if="heading"
      :class="slots.groupHeading()"
      data-slot="command-group-heading"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
