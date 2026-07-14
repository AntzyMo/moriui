<script setup lang="ts">
  import { Separator } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Separator</h2>
    <div class="playground__stack">
      <p>账户资料</p>
      <Separator decorative />
      <p>通知设置</p>

      <div class="flex h-8 items-center gap-3 text-sm">
        <span>资料库</span>
        <Separator decorative orientation="vertical" />
        <span>设置</span>
      </div>
    </div>
  </section>
</template>
