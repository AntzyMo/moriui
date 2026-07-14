<script setup lang="ts">
  import {
    Carousel,
    CarouselAutoplay,
    CarouselContent,
    CarouselIndicators,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
  } from 'moriui'

  const carouselSlides = [
    { title: '组件行为', description: 'Embla 处理拖拽、滚动吸附与响应式重算。' },
    { title: 'Nova 视觉', description: '轮播容器使用弱描边、紧凑控件与语义 Token。' },
    { title: '无障碍', description: '键盘、分页与播放状态都提供可访问的操作入口。' }
  ]
</script>

<template>
  <section class="playground__section">
    <h2>Carousel</h2>
    <div class="playground__carousel-examples">
      <div class="playground__carousel-example">
        <p class="playground__example-label">
          基础手动导航
        </p>
        <Carousel aria-label="MoriUI 轮播基础示例">
          <CarouselContent>
            <CarouselItem v-for="slide in carouselSlides" :key="slide.title">
              <div class="playground__carousel-slide">
                <strong>{{ slide.title }}</strong><span>{{ slide.description }}</span>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious /><CarouselNext />
        </Carousel>
      </div>
      <div class="playground__carousel-example">
        <p class="playground__example-label">
          垂直轮播
        </p>
        <Carousel aria-label="MoriUI 垂直轮播示例" class="playground__vertical-carousel" orientation="vertical">
          <CarouselContent>
            <CarouselItem v-for="slide in carouselSlides" :key="slide.title">
              <div class="playground__carousel-slide">
                <strong>{{ slide.title }}</strong><span>{{ slide.description }}</span>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious /><CarouselNext />
        </Carousel>
      </div>
      <div class="playground__carousel-example">
        <p class="playground__example-label">
          分页与自动播放
        </p>
        <Carousel aria-label="MoriUI 自动播放轮播示例" :autoplay="{ delay: 4000 }" :opts="{ loop: true }">
          <CarouselContent>
            <CarouselItem v-for="slide in carouselSlides" :key="slide.title">
              <div class="playground__carousel-slide">
                <strong>{{ slide.title }}</strong><span>{{ slide.description }}</span>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious /><CarouselNext /><CarouselIndicators /><CarouselAutoplay />
        </Carousel>
      </div>
    </div>
  </section>
</template>
