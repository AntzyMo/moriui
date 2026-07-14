<script setup lang="ts">
  import type { Direction } from 'reka-ui'

  import { defineComponent, h, shallowRef } from 'vue'
  import { Button, DirectionProvider, useDirection } from 'moriui'

  const direction = shallowRef<Direction>('ltr')

  const DirectionValue = defineComponent({
    setup() {
      const currentDirection = useDirection()

      return () => h('p', { class: 'playground__example-label' }, `当前上下文方向：${currentDirection.value}`)
    }
  })
</script>

<template>
  <section class="playground__section">
    <h2>Direction</h2>
    <div class="playground__stack">
      <DirectionProvider :direction="direction">
        <div :dir="direction" class="rounded-lg border border-border bg-muted p-4 text-sm">
          <DirectionValue />
          <p class="mt-2 text-muted-foreground">
            这个局部容器会显式设置 <code>dir</code>，而 Provider 仅向 MoriUI 与 Reka 组件传递方向上下文。
          </p>
        </div>
      </DirectionProvider>
      <Button variant="outline" size="sm" @click="direction = direction === 'ltr' ? 'rtl' : 'ltr'">
        切换为{{ direction === 'ltr' ? '从右到左' : '从左到右' }}
      </Button>
    </div>
  </section>
</template>
