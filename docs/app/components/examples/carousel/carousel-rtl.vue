<script setup lang="ts">
  import {
    Card,
    CardContent,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    DirectionProvider
  } from 'moriui'

  const items = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس']
</script>

<template>
  <DirectionProvider dir="rtl">
    <Carousel class="w-full max-w-xs" :opts="{ direction: 'rtl' }">
      <CarouselContent>
        <CarouselItem v-for="(item, index) in items" :key="index">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-2xl font-semibold">{{ item }}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </DirectionProvider>
</template>
