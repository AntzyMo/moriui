<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Button,
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    Input
  } from 'moriui'

  const sameAddress = shallowRef(true)
</script>

<template>
  <form class="w-full max-w-md">
    <FieldGroup>
      <FieldSet>
        <FieldLegend>付款信息</FieldLegend>
        <FieldDescription>所有交易均经过加密。</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel for="card-name">
              持卡人
            </FieldLabel><Input id="card-name" required placeholder="林晓" />
          </Field>
          <Field>
            <FieldLabel for="card-number">
              卡号
            </FieldLabel><Input
              id="card-number"
              required
              inputmode="numeric"
              placeholder="1234 5678 9012 3456"
            /><FieldDescription>请输入 16 位卡号。</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <Field orientation="horizontal">
        <Checkbox id="same-address" v-model="sameAddress" /><FieldLabel for="same-address">
          账单地址与收货地址相同
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">
          提交
        </Button><Button type="button" variant="outline">
          取消
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
