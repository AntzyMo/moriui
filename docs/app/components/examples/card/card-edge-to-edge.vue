<script setup lang="ts">
  import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle
  } from 'moriui'
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader><CardTitle>边到边内容</CardTitle></CardHeader><div class="border-y bg-muted px-4 py-6 text-sm text-muted-foreground">
      跨越内容内边距的媒体区域
    </div><CardFooter>最近更新于今天</CardFooter>
  </Card>
</template>
