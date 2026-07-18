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

  const channel = shallowRef('email')
</script>

<template>
  <FieldSet class="w-full max-w-xs">
    <FieldLegend variant="label">
      通知偏好
    </FieldLegend>
    <FieldDescription>请重新确认接收通知的方式。</FieldDescription>
    <RadioGroup v-model="channel">
      <Field
        v-for="item in [['email', '仅邮件'], ['sms', '仅短信'], ['both', '邮件和短信']]"
        :key="item[0]"
        orientation="horizontal"
        data-invalid
      >
        <RadioGroupItem :id="`invalid-${item[0]}`" :value="item[0]" aria-invalid="true" />
        <FieldLabel :for="`invalid-${item[0]}`">
          {{ item[1] }}
        </FieldLabel>
      </Field>
    </RadioGroup>
  </FieldSet>
</template>
