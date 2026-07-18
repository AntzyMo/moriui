<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Slider, SliderRange, SliderThumb, SliderTrack } from 'moriui'

  const range = shallowRef([25, 50])
</script>

<template>
  <Slider
    v-model="range"
    :max="100"
    :step="5"
    class="mx-auto w-full max-w-xs"
  >
    <SliderTrack><SliderRange /></SliderTrack>
    <SliderThumb aria-label="范围起点" /><SliderThumb aria-label="范围终点" />
  </Slider>
</template>
