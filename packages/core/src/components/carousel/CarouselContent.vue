<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { computed } from 'vue'
  import { useCarousel } from './useCarousel'
  import { carouselVariants } from './variants'

  defineOptions({ inheritAttrs: false })
  const props = defineProps<Props>()
  interface Props { class?: HTMLAttributes['class'] }
  const { carouselRef, orientation } = useCarousel()
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))
  function setCarouselRef(element: unknown) {
    carouselRef.value = element instanceof HTMLElement ? element : undefined
  }
</script>

<template>
  <div :ref="setCarouselRef" :class="slots.viewport()" data-slot="carousel-content">
    <div v-bind="$attrs" :class="slots.content({ class: props.class as never })" data-slot="carousel-track">
      <slot />
    </div>
  </div>
</template>
