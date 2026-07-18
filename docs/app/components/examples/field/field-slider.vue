<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldDescription,
    FieldTitle,
    Slider,
    SliderRange,
    SliderThumb,
    SliderTrack
  } from 'moriui'

  const budget = shallowRef([500])
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldTitle>预算范围</FieldTitle>
    <FieldDescription>当前预算：¥{{ budget[0] }}</FieldDescription>
    <Slider
      v-model="budget"
      :min="0"
      :max="1000"
      :step="10"
      aria-label="预算范围"
    >
      <SliderTrack><SliderRange /></SliderTrack><SliderThumb />
    </Slider>
  </Field>
</template>
