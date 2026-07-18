<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Slider, SliderRange, SliderThumb, SliderTrack } from 'moriui'

  const primary = shallowRef([50])
  const secondary = shallowRef([25])
</script>

<template>
  <div class="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
    <Slider
      v-model="primary"
      :max="100"
      :step="1"
      orientation="vertical"
      aria-label="主通道"
      class="h-40"
    >
      <SliderTrack><SliderRange /></SliderTrack><SliderThumb />
    </Slider>
    <Slider
      v-model="secondary"
      :max="100"
      :step="1"
      orientation="vertical"
      aria-label="辅助通道"
      class="h-40"
    >
      <SliderTrack><SliderRange /></SliderTrack><SliderThumb />
    </Slider>
  </div>
</template>
