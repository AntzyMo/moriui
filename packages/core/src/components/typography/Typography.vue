<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { TypographyVariants } from './variants'

  import { computed } from 'vue'
  import { Primitive } from 'reka-ui'

  import { typographyVariants } from './variants'

  type TypographyType = NonNullable<TypographyVariants['type']>

  interface Props extends PrimitiveProps {
    type?: TypographyType
    align?: TypographyVariants['align']
    color?: TypographyVariants['color']
    weight?: TypographyVariants['weight']
    truncate?: TypographyVariants['truncate']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'body',
    align: 'start',
    color: 'default'
  })

  const defaultElementByType: Record<TypographyType, string> = {
    'body': 'p',
    'body-sm': 'p',
    'body-xs': 'p',
    'code': 'code',
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'h4': 'h4',
    'h5': 'h5',
    'h6': 'h6'
  }

  const element = computed(() => props.as ?? defaultElementByType[props.type])
  const slots = computed(() => typographyVariants({
    type: props.type,
    align: props.align,
    color: props.color,
    weight: props.weight,
    truncate: props.truncate
  }))
</script>

<template>
  <Primitive
    :as="element"
    :as-child="asChild"
    :class="slots.base({ class: props.class as never })"
    :data-type="type"
    data-slot="typography"
  >
    <slot />
  </Primitive>
</template>
