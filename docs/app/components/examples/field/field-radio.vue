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
    </FieldLegend><FieldDescription>年付方案更优惠。</FieldDescription>
    <RadioGroup v-model="plan">
      <Field orientation="horizontal">
        <RadioGroupItem id="monthly" value="monthly" /><FieldLabel for="monthly">
          月付（¥68/月）
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="yearly" value="yearly" /><FieldLabel for="yearly">
          年付（¥680/年）
        </FieldLabel>
      </Field>
    </RadioGroup>
  </FieldSet>
</template>
