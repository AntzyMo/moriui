<script setup lang="ts">
  import {
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger
  } from 'moriui'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        打开 Popover
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <PopoverHeader>
        <PopoverTitle>标题</PopoverTitle>
        <PopoverDescription>这是一段 Popover 描述文本。</PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
</template>
