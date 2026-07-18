<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
    RadioGroup,
    RadioGroupItem
  } from 'moriui'

  const plan = shallowRef('monthly')
</script>

<template>
  <FieldSet class="w-full max-w-xs">
    <FieldLegend variant="label">
      订阅方案
    </FieldLegend>
    <FieldDescription>年付与终身方案可节省更多费用。</FieldDescription>
    <RadioGroup v-model="plan">
      <Field v-for="item in [['monthly', '月付（¥68/月）'], ['yearly', '年付（¥680/年）'], ['lifetime', '终身（¥1,980）']]" :key="item[0]" orientation="horizontal">
        <RadioGroupItem :id="`subscription-${item[0]}`" :value="item[0]" />
        <FieldLabel :for="`subscription-${item[0]}`">
          {{ item[1] }}
        </FieldLabel>
      </Field>
    </RadioGroup>
  </FieldSet>
</template>
