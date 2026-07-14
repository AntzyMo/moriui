<script setup lang="ts">
  import { CircleAlert, CircleCheck, TriangleAlert } from '@lucide/vue'
  import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
    Button
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Alert</h2>
    <div class="playground__stack">
      <Alert>
        <CircleCheck aria-hidden="true" />
        <AlertTitle>更改已保存</AlertTitle>
        <AlertDescription>
          你的偏好设置会在下次打开页面时生效。
        </AlertDescription>
      </Alert>

      <Alert>
        <AlertTitle>深色模式现已可用</AlertTitle>
        <AlertDescription>
          可在个人偏好设置中启用。
        </AlertDescription>
        <AlertAction>
          <Button size="xs">
            启用
          </Button>
        </AlertAction>
      </Alert>

      <Alert
        :style="{
          '--alert-bg': 'oklch(0.95 0.04 250)',
          '--alert-border': 'oklch(0.8 0.08 250)',
          '--alert-fg': 'oklch(0.32 0.12 250)',
          '--alert-description-fg': 'oklch(0.45 0.08 250)',
        }"
      >
        <CircleAlert aria-hidden="true" />
        <AlertTitle>自定义颜色</AlertTitle>
        <AlertDescription>
          通过 Alert 局部 Token 自定义背景、边框和文字颜色。
        </AlertDescription>
      </Alert>

      <Alert class="border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
        <CircleCheck aria-hidden="true" />
        <AlertTitle>Tailwind 自定义颜色</AlertTitle>
        <AlertDescription class="text-emerald-700 dark:text-emerald-300">
          也可以直接传入 Tailwind CSS 类名覆盖 Alert 的视觉样式。
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <TriangleAlert aria-hidden="true" />
        <AlertTitle>无法处理付款</AlertTitle>
        <AlertDescription>
          请检查账单信息后重试。
        </AlertDescription>
      </Alert>
    </div>
  </section>
</template>
