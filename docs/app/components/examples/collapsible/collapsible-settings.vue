<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Bell, ChevronDown, Eye, Settings, Shield, User } from '@lucide/vue'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'moriui'

  const generalOpen = shallowRef(true)
  const notifyOpen = shallowRef(false)
  const privacyOpen = shallowRef(false)
</script>

<template>
  <div class="w-full max-w-sm rounded-md border">
    <div class="border-b px-4 py-3 text-sm font-semibold">
      <div class="flex items-center gap-2">
        <Settings class="size-4" />
        <span>设置</span>
      </div>
    </div>
    <div class="divide-y">
      <Collapsible v-model:open="generalOpen">
        <CollapsibleTrigger class="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted/50">
          <User class="size-4 text-muted-foreground" />
          <span class="flex-1 text-left">通用</span>
          <ChevronDown class="size-4 text-muted-foreground transition-transform" :class="generalOpen && 'rotate-180'" />
        </CollapsibleTrigger>
        <CollapsibleContent class="px-4 pb-3 text-sm text-muted-foreground">
          <div class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/30">
            <span>语言</span>
            <span class="text-xs">简体中文</span>
          </div>
          <div class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/30">
            <span>主题</span>
            <span class="text-xs">跟随系统</span>
          </div>
          <div class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/30">
            <span>时区</span>
            <span class="text-xs">UTC+8</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible v-model:open="notifyOpen">
        <CollapsibleTrigger class="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted/50">
          <Bell class="size-4 text-muted-foreground" />
          <span class="flex-1 text-left">通知</span>
          <ChevronDown class="size-4 text-muted-foreground transition-transform" :class="notifyOpen && 'rotate-180'" />
        </CollapsibleTrigger>
        <CollapsibleContent class="px-4 pb-3 text-sm text-muted-foreground">
          <div class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/30">
            <span>推送通知</span>
            <span class="text-xs">已开启</span>
          </div>
          <div class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/30">
            <span>邮件提醒</span>
            <span class="text-xs">已关闭</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible v-model:open="privacyOpen">
        <CollapsibleTrigger class="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted/50">
          <Shield class="size-4 text-muted-foreground" />
          <span class="flex-1 text-left">隐私</span>
          <ChevronDown class="size-4 text-muted-foreground transition-transform" :class="privacyOpen && 'rotate-180'" />
        </CollapsibleTrigger>
        <CollapsibleContent class="px-4 pb-3 text-sm text-muted-foreground">
          <div class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/30">
            <span>在线状态</span>
            <span class="text-xs">所有人可见</span>
          </div>
          <div class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/30">
            <Eye class="size-3.5" />
            <span>活动记录</span>
            <span class="text-xs">仅自己</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>
