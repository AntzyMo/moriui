<script setup lang="ts">
  import { Plus } from '@lucide/vue'
  import { Button, Spinner } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>变体</h2>
    <div class="playground__row">
      <Button>默认</Button>
      <Button variant="outline">
        描边
      </Button>
      <Button variant="secondary">
        次要
      </Button>
      <Button variant="ghost">
        幽灵
      </Button>
      <Button variant="destructive">
        删除
      </Button>
      <Button variant="link">
        链接
      </Button>
    </div>
  </section>

  <section class="playground__section">
    <h2>尺寸与状态</h2>
    <div class="playground__row">
      <Button size="xs">
        超小
      </Button>
      <Button size="sm">
        小号
      </Button>
      <Button>默认</Button>
      <Button size="lg">
        大号
      </Button>
      <Button variant="outline" size="icon" aria-label="添加项目">
        <Plus aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="添加项目">
        <Plus aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon-xs" aria-label="添加项目">
        <Plus aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="添加项目">
        <Plus aria-hidden="true" />
      </Button>

      <Button disabled>
        不可用
      </Button>
      <Button size="sm" disabled>
        <Spinner />
        保存中
      </Button>
    </div>
  </section>
</template>
