<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ButtonVariants } from '../button/variants'

  import { computed } from 'vue'
  import { Pause, Play } from '@lucide/vue'

  import Button from '../button/Button.vue'
  import { useCarousel } from './useCarousel'
  import { carouselVariants } from './variants'

  interface Props { class?: HTMLAttributes['class'], pauseLabel?: string, playLabel?: string, size?: ButtonVariants['size'], variant?: ButtonVariants['variant'] }
  const props = withDefaults(defineProps<Props>(), { pauseLabel: '暂停轮播', playLabel: '播放轮播', size: 'icon-sm', variant: 'outline' })
  const { isAutoplayEnabled, isAutoplayPlaying, orientation, slideCount, toggleAutoplay } = useCarousel()
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))
  const label = computed(() => isAutoplayPlaying.value ? props.pauseLabel : props.playLabel)
</script>

<template>
  <Button
    v-bind="$attrs"
    :aria-label="label"
    :class="slots.autoplay({ class: props.class as never })"
    :data-state="isAutoplayPlaying ? 'playing' : 'paused'"
    :disabled="!isAutoplayEnabled || slideCount <= 1"
    :size="size"
    :variant="variant"
    data-slot="carousel-autoplay"
    @click="toggleAutoplay"
  >
    <slot :is-playing="isAutoplayPlaying">
      <Pause
        v-if="isAutoplayPlaying"
        :class="slots.autoplayPauseIcon()"
        aria-hidden="true"
        data-slot="carousel-autoplay-pause-icon"
      />
      <Play
        v-else
        :class="slots.autoplayPlayIcon()"
        aria-hidden="true"
        data-slot="carousel-autoplay-play-icon"
      />
    </slot>
  </Button>
</template>
