<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
    RadioGroup,
    RadioGroupItem
  } from 'moriui'

  const environment = shallowRef('kubernetes')
</script>

<template>
  <FieldSet class="w-full max-w-xs">
    <FieldLegend variant="label">
      计算环境
    </FieldLegend>
    <RadioGroup v-model="environment">
      <FieldLabel for="kubernetes">
        <Field orientation="horizontal">
          <FieldContent><FieldTitle>Kubernetes</FieldTitle><FieldDescription>在 K8s 集群运行工作负载。</FieldDescription></FieldContent><RadioGroupItem id="kubernetes" value="kubernetes" />
        </Field>
      </FieldLabel>
      <FieldLabel for="vm">
        <Field orientation="horizontal">
          <FieldContent><FieldTitle>虚拟机</FieldTitle><FieldDescription>使用独立虚拟机运行任务。</FieldDescription></FieldContent><RadioGroupItem id="vm" value="vm" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  </FieldSet>
</template>
