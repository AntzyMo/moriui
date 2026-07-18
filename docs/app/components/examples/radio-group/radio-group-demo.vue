<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, RadioGroup, RadioGroupItem } from 'moriui'

  const density = shallowRef('comfortable')
</script>

<template>
  <RadioGroup v-model="density" aria-label="界面密度" class="w-fit">
    <Field v-for="item in [['default', '默认'], ['comfortable', '舒适'], ['compact', '紧凑']]" :key="item[0]" orientation="horizontal">
      <RadioGroupItem :id="`density-${item[0]}`" :value="item[0]" />
      <FieldLabel :for="`density-${item[0]}`">
        {{ item[1] }}
      </FieldLabel>
    </Field>
  </RadioGroup>
</template>
