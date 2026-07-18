<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Slider, SliderRange, SliderThumb, SliderTrack } from 'moriui'

  const volume = shallowRef([64])
</script>

<template>
  <Slider
    v-model="volume"
    :max="100"
    :step="1"
    aria-label="音量"
    class="w-32"
  >
    <SliderTrack><SliderRange /></SliderTrack><SliderThumb />
  </Slider>
</template>
