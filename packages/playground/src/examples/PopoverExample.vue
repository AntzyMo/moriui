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
  <section class="playground__section">
    <h2>Popover</h2>

    <div class="flex flex-wrap gap-6">
      <!-- 基础示例：带表单的 Popover -->
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">
            打开 Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <PopoverHeader>
            <PopoverTitle>尺寸设置</PopoverTitle>
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

      <!-- 对齐方式示例 -->
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="sm">
            Start
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" class="w-40">
          对齐到 start
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="sm">
            Center
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" class="w-40">
          对齐到 center
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="sm">
            End
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" class="w-40">
          对齐到 end
        </PopoverContent>
      </Popover>
    </div>
  </section>
</template>
