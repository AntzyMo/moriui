<script setup lang="ts">
  import { DirectionProvider, HoverCard, HoverCardContent, HoverCardTrigger } from 'moriui'
</script>

<template>
  <DirectionProvider dir="rtl">
    <HoverCard :open-delay="0">
      <HoverCardTrigger as-child>
        <a class="underline underline-offset-4" href="#">بطاقة التحويم</a>
      </HoverCardTrigger>
      <HoverCardContent class="w-64">
        <p class="text-sm">
          محتوى بطاقة التحويم في الاتجاه من اليمين إلى اليسار
        </p>
      </HoverCardContent>
    </HoverCard>
  </DirectionProvider>
</template>
