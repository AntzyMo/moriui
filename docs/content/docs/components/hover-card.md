---
title: Hover Card 悬浮信息卡
description: 用于悬浮信息卡场景的 MoriUI 组件。
---

# Hover Card 悬浮信息卡

用于悬浮信息卡场景的 MoriUI 组件。

## 导入

```ts
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardTrigger } from 'moriui'
```

## 示例

### 概览

悬浮在日历时查看详情。

::component-preview{name="hover-card-demo"}
::

### 定位

使用 side 控制卡片弹出方向。

::component-preview{name="hover-card-sides"}
::

### RTL

从右到左的悬浮卡片布局。

::component-preview{name="hover-card-rtl"}
::

## 使用说明

### 组合方式

HoverCard 由 Trigger、Portal、Content 与可选 Arrow 组成；通过鼠标悬浮或焦点触发。

### 定位

Content 的 side 与 align 控制弹出卡片的方向和对齐。

### RTL

方向由 DirectionProvider 控制。

## 变体

HoverCardContent 的 side 与 align 来自 Reka Popper 定位。

## 可访问性

HoverCard 复用 Reka UI Popper 的悬浮触发，并支持键盘焦点触发。Content 内的交互元素键盘用户可通过 Tab 进入；隐藏时不应保留可聚焦元素。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `HoverCard v-model:open` | `boolean` | `undefined` | 悬浮卡的受控打开状态。 |
| `HoverCard defaultOpen` | `boolean` | `false` | 非受控初始打开状态。 |
| `HoverCard openDelay` | `number` | `300` | 悬浮后打开延迟的毫秒数。 |
| `HoverCard closeDelay` | `number` | `300` | 离开后关闭延迟的毫秒数。 |
| `HoverCardContent side / align` | `PopperContentProps` | `'bottom' / 'center'` | 卡片方向与对齐。 |
| `HoverCardContent sideOffset` | `number` | `4` | 卡片与触发器的偏移像素。 |
| `HoverCardArrow width / height` | `number` | `10 / 5` | 箭头的宽度与高度。 |
