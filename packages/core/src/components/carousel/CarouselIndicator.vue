<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { computed, useAttrs } from 'vue'
  import { useCarousel } from './useCarousel'
  import { carouselVariants } from './variants'

  interface Props { class?: HTMLAttributes['class'], index: number }
  const props = defineProps<Props>()
  const attrs = useAttrs()
  const { orientation, scrollTo, selectedIndex } = useCarousel()
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))
  const isSelected = computed(() => selectedIndex.value === props.index)
  const ariaLabel = computed(() => typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : `跳转到第 ${props.index + 1} 张`)
</script>

<template>
  <button
    v-bind="$attrs"
    :aria-current="isSelected ? 'true' : undefined"
    :aria-label="ariaLabel"
    :class="slots.indicator({ class: props.class as never })"
    :data-state="isSelected ? 'active' : 'inactive'"
    data-slot="carousel-indicator"
    type="button"
    @click="scrollTo(index)"
  >
    <slot />
  </button>
</template>
