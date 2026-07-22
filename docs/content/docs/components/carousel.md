---
title: Carousel 内容轮播
description: 用于内容轮播场景的 MoriUI 组件。
---

# Carousel 内容轮播

用于内容轮播场景的 MoriUI 组件。

## 导入

```ts
import { Carousel, CarouselAutoplay, CarouselContent, CarouselIndicator, CarouselIndicators, CarouselItem, CarouselNext, CarouselPrevious } from 'moriui'
```

## 示例

### 概览

图片卡片的横向轮播。

::component-preview{name="carousel-demo"}
::

### 尺寸

不同尺寸的轮播项目。

::component-preview{name="carousel-size"}
::

### 方向

垂直方向的轮播。

::component-preview{name="carousel-orientation"}
::

### 多项目

同时显示多个项目。

::component-preview{name="carousel-multiple"}
::

### 间距

自定义项目间距。

::component-preview{name="carousel-spacing"}
::

### 自动播放

CarouselAutoplay 插件。

::component-preview{name="carousel-plugin"}
::

### RTL

从右到左的轮播方向。

::component-preview{name="carousel-rtl"}
::

## 使用说明

### 组合方式

Carousel 由 Content、Item、Previous、Next、Indicators 和 Autoplay 组成，支持多种布局配置。

### 方向

orientation 支持 horizontal 与 vertical。

### 间距

通过 class 中的 gap 控制项目间距。

### 插件

CarouselAutoplay 插件可开启自动轮播。

### RTL

方向由 DirectionProvider 控制。

## 变体

Carousel 的 orientation 支持 horizontal/vertical；opts 支持 slidesToShow、loop、align 等 Embla 选项。

## 可访问性

Carousel 使用 Embla 的区域和 ARIA 属性。Previous/Next 按钮应提供 aria-label。当前状态可通过 Indicators 展示。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Carousel orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 轮播滚动方向。 |
| `Carousel opts` | `CarouselOptions` | `{ loop: false }` | Embla Carousel 配置项。 |
| `Carousel plugins` | `CarouselPlugin[]` | `[]` | Embla 插件数组。 |
| `CarouselContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到内容容器的调用方类。 |
| `CarouselItem class` | `HTMLAttributes["class"]` | `undefined` | 合并到每个项目的调用方类。 |
| `CarouselPrevious class` | `HTMLAttributes["class"]` | `undefined` | 合并到上一页按钮的调用方类。 |
| `CarouselNext class` | `HTMLAttributes["class"]` | `undefined` | 合并到下一页按钮的调用方类。 |
| `useCarousel()` | `CarouselApi` | `—` | 获取轮播 API 实例进行受控操作。 |
