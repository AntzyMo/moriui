<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Slider, SliderRange, SliderThumb, SliderTrack } from 'moriui'

  const value = shallowRef([50])
</script>

<template>
  <Slider
    v-model="value"
    :max="100"
    :step="1"
    aria-label="禁用的音量"
    class="mx-auto w-full max-w-xs"
    disabled
  >
    <SliderTrack><SliderRange /></SliderTrack><SliderThumb />
  </Slider>
</template>
