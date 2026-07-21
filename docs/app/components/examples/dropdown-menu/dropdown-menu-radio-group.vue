<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from 'moriui'

  const density = shallowRef('comfortable')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        界面密度
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuLabel>密度设置</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="density">
        <DropdownMenuRadioItem value="default">
          默认
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="comfortable">
          舒适
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="compact">
          紧凑
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
