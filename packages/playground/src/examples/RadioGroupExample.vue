<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { RadioGroup, RadioGroupItem } from 'moriui'

  const notificationChannel = shallowRef('email')
</script>

<template>
  <section class="playground__section">
    <h2>Radio Group</h2>
    <div class="playground__stack">
      <RadioGroup v-model="notificationChannel" aria-label="通知方式">
        <label class="playground__row w-fit cursor-pointer" for="radio-group-email">
          <RadioGroupItem id="radio-group-email" value="email" />
          <span>电子邮件</span>
        </label>
        <label class="playground__row w-fit cursor-pointer" for="radio-group-push">
          <RadioGroupItem id="radio-group-push" value="push" />
          <span>推送通知</span>
        </label>
        <label class="playground__row w-fit cursor-not-allowed" for="radio-group-sms">
          <RadioGroupItem id="radio-group-sms" disabled value="sms" />
          <span>短信通知（不可用）</span>
        </label>
      </RadioGroup>

      <p class="text-sm text-muted-foreground">
        当前选择：{{ notificationChannel }}
      </p>

      <RadioGroup aria-label="展示方向" default-value="compact" orientation="horizontal">
        <label class="playground__row w-fit cursor-pointer" for="radio-group-compact">
          <RadioGroupItem id="radio-group-compact" value="compact" />
          <span>紧凑</span>
        </label>
        <label class="playground__row w-fit cursor-pointer" for="radio-group-comfortable">
          <RadioGroupItem id="radio-group-comfortable" value="comfortable" />
          <span>舒适</span>
        </label>
      </RadioGroup>
    </div>
  </section>
</template>
