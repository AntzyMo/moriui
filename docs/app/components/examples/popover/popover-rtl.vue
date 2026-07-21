<script setup lang="ts">
  import {
    Button,
    DirectionProvider,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger
  } from 'moriui'
</script>

<template>
  <DirectionProvider direction="rtl">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline">
          افتح القائمة
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-72">
        <PopoverHeader>
          <PopoverTitle>العنوان</PopoverTitle>
          <PopoverDescription>نص الوصف هنا.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  </DirectionProvider>
</template>
