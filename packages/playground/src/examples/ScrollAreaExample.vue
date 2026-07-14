<script setup lang="ts">
  import { ScrollArea } from 'moriui'

  const releases = [
    '新增 Scroll Area 的横向与双轴滚动支持。',
    '统一使用 Nova 语义 Token 处理明暗主题。',
    '由 Reka UI 负责拖拽、键盘焦点与滚动条可见性。',
    '滚动条可通过具名插槽替换为自定义组合。',
    '组件样式遵循紧凑、弱描边与短动效基线。',
    'Viewport 仍保留原生滚动与触控惯性支持。'
  ]
</script>

<template>
  <section class="playground__section">
    <h2>Scroll Area</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-2">
        <p class="playground__example-label">
          纵向滚动
        </p>
        <ScrollArea type="always" class="h-48 rounded-xl border">
          <div class="grid gap-1 p-3">
            <div v-for="(release, index) in releases" :key="release" class="rounded-lg border p-3 text-sm">
              <span class="mr-2 text-muted-foreground">0{{ index + 1 }}</span>{{ release }}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div class="grid gap-2">
        <p class="playground__example-label">
          双轴滚动
        </p>
        <ScrollArea orientation="both" type="always" class="h-48 rounded-xl border">
          <div class="grid w-max min-w-[34rem] gap-3 p-3">
            <strong class="text-sm font-medium">MoriUI 组件发布状态</strong>
            <div class="grid grid-cols-6 gap-2">
              <div v-for="release in releases" :key="release" class="grid h-28 w-32 place-items-center rounded-lg border bg-muted/40 p-3 text-center text-xs">
                {{ release.slice(0, 12) }}…
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </section>
</template>
