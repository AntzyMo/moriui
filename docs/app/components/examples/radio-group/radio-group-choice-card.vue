<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
    RadioGroup,
    RadioGroupItem
  } from 'moriui'

  const plan = shallowRef('plus')
  const plans = [
    { value: 'plus', title: 'Plus', description: '适合个人与小型团队。' },
    { value: 'pro', title: 'Pro', description: '适合持续增长的业务。' },
    { value: 'enterprise', title: 'Enterprise', description: '适合大型团队与企业。' }
  ]
</script>

<template>
  <RadioGroup v-model="plan" class="w-full max-w-sm">
    <FieldLabel v-for="item in plans" :key="item.value" :for="`plan-${item.value}`">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{{ item.title }}</FieldTitle>
          <FieldDescription>{{ item.description }}</FieldDescription>
        </FieldContent>
        <RadioGroupItem :id="`plan-${item.value}`" :value="item.value" />
      </Field>
    </FieldLabel>
  </RadioGroup>
</template>
