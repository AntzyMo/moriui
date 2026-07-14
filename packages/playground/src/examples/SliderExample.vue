<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Slider,
    SliderRange,
    SliderThumb,
    SliderTrack
  } from 'moriui'

  const range = shallowRef([25, 75])

  const examples = [
    { label: '基础值', value: [50] },
    { label: '多个拇指', value: [10, 45, 80] }
  ]
</script>

<template>
  <section class="playground__section">
    <h2>Slider</h2>
    <div class="playground__stack">
      <div v-for="example in examples" :key="example.label" class="grid gap-2">
        <p class="playground__example-label">
          {{ example.label }}
        </p>
        <Slider :default-value="example.value">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb v-for="value in example.value" :key="value" />
        </Slider>
      </div>

      <div class="grid gap-2">
        <p class="playground__example-label">
          受控区间：{{ range.join(' – ') }}
        </p>
        <Slider
          v-model="range"
          :min="0"
          :max="100"
          :step="5"
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb v-for="value in range" :key="value" />
        </Slider>
      </div>

      <div class="flex items-center gap-8">
        <div class="grid gap-2">
          <p class="playground__example-label">
            垂直
          </p>
          <Slider :default-value="[50]" orientation="vertical" class="h-36">
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>

        <div class="grid gap-2">
          <p class="playground__example-label">
            禁用
          </p>
          <Slider :default-value="[40]" :disabled="true" class="w-52">
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
      </div>
    </div>
  </section>
</template>
