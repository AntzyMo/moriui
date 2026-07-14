<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ButtonVariants } from '../button/variants'

  import { computed } from 'vue'
  import { ChevronRight } from '@lucide/vue'

  import Button from '../button/Button.vue'
  import { useCarousel } from './useCarousel'
  import { carouselVariants } from './variants'

  interface Props { class?: HTMLAttributes['class'], disabled?: boolean, label?: string, size?: ButtonVariants['size'], variant?: ButtonVariants['variant'] }
  const props = withDefaults(defineProps<Props>(), { disabled: false, label: '下一张', size: 'icon-sm', variant: 'outline' })
  const { canScrollNext, orientation, scrollNext } = useCarousel()
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))
</script>

<template>
  <Button
    v-bind="$attrs"
    :aria-label="label"
    :class="slots.next({ class: props.class as never })"
    :data-orientation="orientation"
    :disabled="disabled || !canScrollNext"
    :size="size"
    :variant="variant"
    data-slot="carousel-next"
    @click="scrollNext"
  >
    <slot><ChevronRight :class="slots.nextIcon()" aria-hidden="true" data-slot="carousel-next-icon" /></slot>
  </Button>
</template>
