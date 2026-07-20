<script setup lang="ts">
import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'moriui'
</script>
<template>
  <Carousel orientation="vertical" class="w-full max-w-[12rem] h-60">
    <CarouselContent>
      <CarouselItem v-for="index in 5" :key="index" class="basis-1/2">
        <div class="p-1">
          <Card>
            <CardContent class="flex items-center justify-center p-6">
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
