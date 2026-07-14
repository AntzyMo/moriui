<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { useCarousel } from './useCarousel'
  import { carouselVariants } from './variants'
  import { computed, shallowRef, useAttrs } from 'vue'

  interface Props { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
  const attrs = useAttrs()
  const item = shallowRef<HTMLElement>()
  const { api, orientation, slideCount } = useCarousel()
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))
  const position = computed(() => {
    const index = item.value && api.value ? api.value.slideNodes().indexOf(item.value) : -1
    return index >= 0 ? index + 1 : undefined
  })
  const ariaLabel = computed(() => typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : position.value ? `${position.value} / ${slideCount.value}` : undefined)
</script>

<template>
  <div
    ref="item"
    v-bind="$attrs"
    :aria-label="ariaLabel"
    :class="slots.item({ class: props.class as never })"
    aria-roledescription="slide"
    data-slot="carousel-item"
    role="group"
  >
    <slot />
  </div>
</template>
