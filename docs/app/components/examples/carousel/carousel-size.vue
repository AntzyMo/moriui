<script setup lang="ts">
import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'moriui'
</script>
<template>
  <div class="flex w-full max-w-lg flex-col gap-8">
    <div>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">每项 50% 宽度</h3>
      <Carousel :opts="{ align: 'start' }">
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
    </div>
    <div>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">每项 33% 宽度</h3>
      <Carousel :opts="{ align: 'start' }">
        <CarouselContent>
          <CarouselItem v-for="index in 6" :key="index" class="basis-1/3">
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
    </div>
  </div>
</template>
