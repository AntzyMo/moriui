<script setup lang="ts">
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    Input
  } from 'moriui'
</script>

<template>
  <FieldSet class="w-full max-w-sm">
    <FieldLegend>地址信息</FieldLegend><FieldDescription>我们需要地址来配送订单。</FieldDescription><FieldGroup>
      <Field>
        <FieldLabel for="street">
          街道地址
        </FieldLabel><Input id="street" placeholder="中山路 123 号" />
      </Field>
      <div class="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel for="city">
            城市
          </FieldLabel><Input id="city" placeholder="上海" />
        </Field><Field>
          <FieldLabel for="postal">
            邮编
          </FieldLabel><Input id="postal" placeholder="200000" />
        </Field>
      </div>
    </FieldGroup>
  </FieldSet>
</template>
