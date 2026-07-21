<script setup lang="ts">
  import {
    Card,
    CardContent,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
  } from 'moriui'
</script>

<template>
  <Carousel class="w-full max-w-lg" :opts="{ align: 'start', slidesToScroll: 2 }">
    <CarouselContent>
      <CarouselItem v-for="index in 6" :key="index" class="basis-1/2">
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-3xl font-semibold">{{ index }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
