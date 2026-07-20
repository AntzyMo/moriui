<script setup lang="ts">
import { shallowRef } from 'vue'
import { Sun, Moon, Monitor } from '@lucide/vue'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from 'moriui'

const theme = shallowRef('system')
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">主题</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuLabel>选择主题</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="theme">
        <DropdownMenuRadioItem value="light">
          <DropdownMenuItemIndicator />
          <Sun class="size-4" />
          浅色
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">
          <DropdownMenuItemIndicator />
          <Moon class="size-4" />
          深色
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">
          <DropdownMenuItemIndicator />
          <Monitor class="size-4" />
          跟随系统
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
