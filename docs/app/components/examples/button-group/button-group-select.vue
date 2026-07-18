<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ArrowRight } from '@lucide/vue'
  import {
    Button,
    ButtonGroup,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectTrigger,
    SelectValue,
    SelectViewport
  } from 'moriui'

  const amount = shallowRef('')
  const currency = shallowRef('CNY')
</script>

<template>
  <ButtonGroup>
    <Select v-model="currency">
      <SelectTrigger aria-label="币种" class="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectViewport>
          <SelectItem v-for="item in ['CNY', 'USD', 'EUR']" :key="item" :value="item">
            <SelectItemIndicator /><SelectItemText>{{ item }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </Select>
    <Input
      v-model="amount"
      aria-label="金额"
      inputmode="decimal"
      placeholder="10.00"
    />
    <Button size="icon" variant="outline" aria-label="确认金额">
      <ArrowRight />
    </Button>
  </ButtonGroup>
</template>
