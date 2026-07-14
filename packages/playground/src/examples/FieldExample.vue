<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
    Input
  } from 'moriui'

  const notifications = shallowRef(true)
</script>

<template>
  <section class="playground__section">
    <h2>Field</h2>
    <form class="playground__stack max-w-xl">
      <FieldSet>
        <FieldLegend>个人资料</FieldLegend>
        <FieldDescription>此信息将显示在你的个人资料中。</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel for="field-example-name">
              显示名称
            </FieldLabel>
            <Input id="field-example-name" placeholder="MoriUI" />
            <FieldDescription>使用其他人可识别的名称。</FieldDescription>
          </Field>

          <Field data-invalid>
            <FieldLabel for="field-example-email">
              邮箱地址
            </FieldLabel>
            <Input id="field-example-email" aria-invalid="true" placeholder="name@example.com" />
            <FieldError :errors="['请输入有效的邮箱地址。', '请输入有效的邮箱地址。']" />
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator>通知偏好</FieldSeparator>

      <Field orientation="horizontal">
        <Checkbox id="field-example-notifications" v-model="notifications" />
        <FieldContent>
          <FieldTitle>接收更新通知</FieldTitle>
          <FieldDescription>当你的任务有进展时发送邮件提醒。</FieldDescription>
        </FieldContent>
      </Field>

      <FieldGroup class="w-full">
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel for="field-example-bio">
              个人简介
            </FieldLabel>
            <FieldDescription>响应式布局会在容器足够宽时横向排列。</FieldDescription>
          </FieldContent>
          <Input id="field-example-bio" placeholder="介绍一下自己" />
        </Field>
      </FieldGroup>
    </form>
  </section>
</template>
