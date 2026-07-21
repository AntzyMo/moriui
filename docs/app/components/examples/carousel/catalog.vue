<script setup lang="ts">
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'moriui'
</script>

<template>
  <Carousel class="w-full max-w-[10rem]">
    <CarouselContent>
      <CarouselItem class="flex items-center justify-center h-24 bg-muted rounded-lg text-sm font-medium">
        轮播项
      </CarouselItem>
    </CarouselContent><CarouselPrevious /><CarouselNext />
  </Carousel>
</template>
