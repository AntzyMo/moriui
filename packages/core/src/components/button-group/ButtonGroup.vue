<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { ButtonGroupVariants } from './variants'

  import { Primitive } from 'reka-ui'
  import { computed, provide } from 'vue'

  import { buttonGroupVariants } from './variants'
  import { buttonGroupContextKey } from './context'

  interface Props extends PrimitiveProps {
    orientation?: ButtonGroupVariants['orientation']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    orientation: 'horizontal'
  })

  const slots = computed(() => buttonGroupVariants({ orientation: props.orientation }))
  const orientation = computed(() => props.orientation)

  provide(buttonGroupContextKey, { orientation })
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.base({ class: props.class as never })"
    :data-orientation="orientation"
    data-slot="button-group"
    role="group"
  >
    <slot />
  </Primitive>
</template>
