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

  const items = ref({ disk: true, server: false })
</script>

<template>
  <FieldSet class="w-full max-w-xs">
    <FieldLegend variant="label">
      桌面项目
    </FieldLegend><FieldDescription>选择要显示的项目。</FieldDescription><FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="disk" v-model="items.disk" /><FieldLabel for="disk">
          硬盘
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="server" v-model="items.server" /><FieldLabel for="server">
          已连接服务器
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
