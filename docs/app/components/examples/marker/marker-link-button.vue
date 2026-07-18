<script setup lang="ts">
  import { Button, Marker, MarkerContent } from 'moriui'
</script>

<template>
  <Marker>
    <MarkerContent>查看完整活动记录</MarkerContent><Button
      as="a"
      href="#marker-api"
      size="xs"
      variant="link"
    >
      打开
    </Button>
  </Marker>
</template>
