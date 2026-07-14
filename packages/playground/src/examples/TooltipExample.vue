<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipPortal,
    TooltipProvider,
    TooltipTrigger
  } from 'moriui'

  const controlledOpen = shallowRef(false)
</script>

<template>
  <section class="playground__section">
    <h2>Tooltip</h2>
    <TooltipProvider>
      <div class="playground__row">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="sm">
              默认提示
            </Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>
              默认在悬停 300ms 后显示
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="sm">
              顶部提示
            </Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent side="top">
              使用显式 Portal 组合
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>

        <Tooltip v-model:open="controlledOpen">
          <TooltipTrigger as-child>
            <Button variant="outline" size="sm">
              受控提示
            </Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent side="right">
              当前状态：{{ controlledOpen ? '已打开' : '已关闭' }}
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </div>
    </TooltipProvider>
  </section>
</template>
