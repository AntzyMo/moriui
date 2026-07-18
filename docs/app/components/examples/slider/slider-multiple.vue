<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Slider, SliderRange, SliderThumb, SliderTrack } from 'moriui'

  const values = shallowRef([10, 20, 70])
</script>

<template>
  <Slider
    v-model="values"
    :max="100"
    :step="10"
    class="mx-auto w-full max-w-xs"
  >
    <SliderTrack><SliderRange /></SliderTrack>
    <SliderThumb v-for="(_, index) in values" :key="index" :aria-label="`控制点 ${index + 1}`" />
  </Slider>
</template>
