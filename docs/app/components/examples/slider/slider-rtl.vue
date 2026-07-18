<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Slider, SliderRange, SliderThumb, SliderTrack } from 'moriui'

  const value = shallowRef([75])
</script>

<template>
  <Slider
    v-model="value"
    :max="100"
    :step="1"
    aria-label="مستوى الصوت"
    class="mx-auto w-full max-w-xs"
    dir="rtl"
  >
    <SliderTrack><SliderRange /></SliderTrack><SliderThumb />
  </Slider>
</template>
