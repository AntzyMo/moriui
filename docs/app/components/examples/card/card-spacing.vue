<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from 'moriui'
</script>

<template>
  <Card class="w-full max-w-sm [--card-spacing:1.5rem]">
    <CardHeader><CardTitle>自定义间距</CardTitle><CardDescription>通过公开局部 Token 调整内容密度。</CardDescription></CardHeader><CardContent>更宽松的内容区域。</CardContent>
  </Card>
</template>
