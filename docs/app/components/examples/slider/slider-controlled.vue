<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldLabel,
    Slider,
    SliderRange,
    SliderThumb,
    SliderTrack
  } from 'moriui'

  const temperature = shallowRef([0.3, 0.7])
</script>

<template>
  <Field class="mx-auto w-full max-w-xs">
    <div class="flex items-center justify-between gap-2">
      <FieldLabel>温度范围</FieldLabel>
      <span class="text-muted-foreground text-sm">{{ temperature.join('，') }}</span>
    </div>
    <Slider
      v-model="temperature"
      :min="0"
      :max="1"
      :step="0.1"
    >
      <SliderTrack><SliderRange /></SliderTrack>
      <SliderThumb aria-label="最低温度" /><SliderThumb aria-label="最高温度" />
    </Slider>
  </Field>
</template>
