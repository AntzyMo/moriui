<script setup lang="ts">
  import { ref } from 'vue'
  import { ChevronsUpDown } from '@lucide/vue'
  import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from 'moriui'

  const isOpen = ref(false)
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    class="flex w-[350px] flex-col gap-2"
  >
    <div class="flex items-center justify-between gap-4 px-4">
      <h4 class="text-sm font-semibold">
        订单 #4189
      </h4>
      <CollapsibleTrigger as-child>
        <Button variant="ghost" size="icon" class="size-8">
          <ChevronsUpDown />
          <span class="sr-only">切换详情</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div class="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
      <span class="text-muted-foreground">状态</span>
      <span class="font-medium">已发货</span>
    </div>
    <CollapsibleContent class="flex flex-col gap-2">
      <div class="rounded-md border px-4 py-2 text-sm">
        <p class="font-medium">收货地址</p>
        <p class="text-muted-foreground">北京市朝阳区 100 号</p>
      </div>
      <div class="rounded-md border px-4 py-2 text-sm">
        <p class="font-medium">商品</p>
        <p class="text-muted-foreground">2x 降噪耳机</p>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
