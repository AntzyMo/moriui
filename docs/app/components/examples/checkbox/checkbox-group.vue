<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
  } from 'moriui'

  const choices = ref({ hardDisks: true, externalDisks: true, opticalMedia: false })
</script>

<template>
  <FieldSet class="w-full max-w-xs">
    <FieldLegend variant="label">
      在桌面显示
    </FieldLegend>
    <FieldDescription>选择需要在桌面显示的项目。</FieldDescription>
    <FieldGroup class="gap-3">
      <Field orientation="horizontal">
        <Checkbox id="hard-disks" v-model="choices.hardDisks" /><FieldLabel for="hard-disks">
          硬盘
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="external-disks" v-model="choices.externalDisks" /><FieldLabel for="external-disks">
          外接磁盘
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="optical-media" v-model="choices.opticalMedia" /><FieldLabel for="optical-media">
          CD、DVD 与 iPod
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
