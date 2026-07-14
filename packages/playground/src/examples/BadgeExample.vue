<script setup lang="ts">
  import { Check } from '@lucide/vue'
  import { Badge, Spinner } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Badge</h2>
    <div class="playground__row">
      <Badge>默认</Badge>
      <Badge variant="secondary">
        次要
      </Badge>
      <Badge variant="destructive">
        删除
      </Badge>
      <Badge variant="outline">
        描边
      </Badge>
      <Badge variant="ghost">
        幽灵
      </Badge>
      <Badge as-child>
        <a href="#badge-link">
          Open Link
        </a>
      </Badge>
      <Badge variant="link">
        文本链接
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" size="xs" />
        加载中
      </Badge>
      <Badge>
        <Check data-icon="inline-start" aria-hidden="true" />
        已完成
      </Badge>
      <Badge class="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        自定义类颜色
      </Badge>
      <Badge :style="{ '--badge-bg': 'oklch(0.72 0.14 145)', '--badge-fg': 'oklch(0.2 0.04 145)' }">
        自定义 Token 颜色
      </Badge>
    </div>
  </section>
</template>
