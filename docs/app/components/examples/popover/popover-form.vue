<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Button,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger
  } from 'moriui'

  const width = ref('100%')
  const height = ref('25px')
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        尺寸设置
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <PopoverHeader>
        <PopoverTitle>尺寸</PopoverTitle>
        <PopoverDescription>设置图层的宽高尺寸。</PopoverDescription>
      </PopoverHeader>
      <div class="grid gap-3">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">宽度</Label>
          <Input id="width" v-model="width" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="height">高度</Label>
          <Input id="height" v-model="height" class="col-span-2 h-8" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
