<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ButtonVariants } from '../button/variants'

  import { computed } from 'vue'
  import { ChevronLeft } from '@lucide/vue'

  import Button from '../button/Button.vue'
  import { useCarousel } from './useCarousel'
  import { carouselVariants } from './variants'

  interface Props { class?: HTMLAttributes['class'], disabled?: boolean, label?: string, size?: ButtonVariants['size'], variant?: ButtonVariants['variant'] }
  const props = withDefaults(defineProps<Props>(), { disabled: false, label: '上一张', size: 'icon-sm', variant: 'outline' })
  const { canScrollPrev, orientation, scrollPrev } = useCarousel()
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))
</script>

<template>
  <Button
    v-bind="$attrs"
    :aria-label="label"
    :class="slots.previous({ class: props.class as never })"
    :data-orientation="orientation"
    :disabled="disabled || !canScrollPrev"
    :size="size"
    :variant="variant"
    data-slot="carousel-previous"
    @click="scrollPrev"
  >
    <slot><ChevronLeft :class="slots.previousIcon()" aria-hidden="true" data-slot="carousel-previous-icon" /></slot>
  </Button>
</template>
