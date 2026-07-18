<script setup lang="ts">
  import { Badge } from 'moriui'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Badge>默认</Badge><Badge variant="secondary">
      次要
    </Badge><Badge variant="destructive">
      异常
    </Badge><Badge variant="outline">
      描边
    </Badge><Badge variant="ghost">
      幽灵
    </Badge>
  </div>
</template>
