<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { computed } from 'vue'
  import { useCarousel } from './useCarousel'
  import { carouselVariants } from './variants'
  import CarouselIndicator from './CarouselIndicator.vue'

  interface Props { class?: HTMLAttributes['class'], label?: string }
  const props = withDefaults(defineProps<Props>(), { label: '轮播分页' })
  const { orientation, scrollTo, selectedIndex, slideCount } = useCarousel()
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))
</script>

<template>
  <div
    v-bind="$attrs"
    :aria-label="label"
    :class="slots.indicators({ class: props.class as never })"
    data-slot="carousel-indicators"
    role="group"
  >
    <slot
      v-if="$slots.default"
      :scroll-to="scrollTo"
      :selected-index="selectedIndex"
      :slide-count="slideCount"
    />
    <template v-else>
      <CarouselIndicator v-for="index in slideCount" :key="index" :index="index - 1" />
    </template>
  </div>
</template>
