<script setup lang="ts">
import { shallowRef } from 'vue'
import { Eye, Activity, Bell } from '@lucide/vue'
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from 'moriui'

const showStatusBar = shallowRef(true)
const showActivity = shallowRef(false)
const showNotifications = shallowRef(true)
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">显示选项</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>界面设置</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem v-model="showStatusBar">
        <Eye class="size-4" />
        状态栏
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem v-model="showActivity">
        <Activity class="size-4" />
        活动面板
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem v-model="showNotifications">
        <Bell class="size-4" />
        通知提醒
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
