<script setup lang="ts">
  import {
    Card,
    CardContent,
    Carousel,
    CarouselAutoplay,
    CarouselContent,
    CarouselItem
  } from 'moriui'
</script>

<template>
  <Carousel class="w-full max-w-xs" autoplay>
    <CarouselContent>
      <CarouselItem v-for="index in 5" :key="index">
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-4xl font-semibold">{{ index }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselAutoplay />
  </Carousel>
</template>
