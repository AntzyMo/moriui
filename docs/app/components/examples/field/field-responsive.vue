<script setup lang="ts">
  import {
    Button,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    Input
  } from 'moriui'
</script>

<template>
  <form class="w-full max-w-lg">
    <FieldSet>
      <FieldLegend>个人资料</FieldLegend><FieldDescription>填写你的公开资料。</FieldDescription><FieldGroup>
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel for="profile-name">
              姓名
            </FieldLabel><FieldDescription>用于团队协作中的身份识别。</FieldDescription>
          </FieldContent><Input id="profile-name" required placeholder="林晓" />
        </Field>
        <Field orientation="responsive">
          <Button type="submit">
            提交
          </Button><Button type="button" variant="outline">
            取消
          </Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  </form>
</template>
