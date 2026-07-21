<script setup lang="ts">
  import { Item, ItemContent, ItemMedia, ItemTitle, Spinner } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-4">
    <div class="rounded-xl bg-muted p-4">
      <Item variant="muted">
        <ItemMedia>
          <Spinner role="status" aria-label="加载中" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle class="line-clamp-1">
            正在处理支付…
          </ItemTitle>
        </ItemContent>
        <ItemContent class="flex-none justify-end">
          <span class="text-sm tabular-nums">¥100.00</span>
        </ItemContent>
      </Item>
    </div>
  </div>
</template>
