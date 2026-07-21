<script setup lang="ts">
  import {
    DirectionProvider,
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
    Spinner
  } from 'moriui'
</script>

<template>
  <DirectionProvider direction="rtl">
    <div class="flex w-full max-w-xs flex-col gap-4" dir="rtl">
      <div class="rounded-xl bg-muted p-4">
        <Item variant="muted" dir="rtl">
          <ItemMedia>
            <Spinner role="status" aria-label="جاري التحميل" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="line-clamp-1">
              جاري معالجة الدفع…
            </ItemTitle>
          </ItemContent>
          <ItemContent class="flex-none justify-end">
            <span class="text-sm tabular-nums">١٠٠٫٠٠ دولار</span>
          </ItemContent>
        </Item>
      </div>
    </div>
  </DirectionProvider>
</template>
