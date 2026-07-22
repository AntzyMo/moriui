---
title: Tooltip 悬停提示
description: 用于悬停提示场景的 MoriUI 组件。
---

# Tooltip 悬停提示

用于悬停提示场景的 MoriUI 组件。

## 导入

```ts
import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from 'moriui'
```

## 示例

### 概览

保存按钮的提示文本。

::component-preview{name="tooltip-demo"}
::

### 定位

使用 side 控制提示出现的方位。

::component-preview{name="tooltip-sides"}
::

### 禁用

禁用按钮仍然触发提示。

::component-preview{name="tooltip-disabled"}
::

### 键盘

键盘焦点也能触发工具提示。

::component-preview{name="tooltip-keyboard"}
::

### RTL

从右到左的提示布局。

::component-preview{name="tooltip-rtl"}
::

## 使用说明

### 组合方式

Tooltip 由 Provider、Trigger、Portal、Content 与可选 Arrow 组成；Provider 统一配置组件的打开延迟与关闭行为。

### 定位

Content 的 side 与 sideOffset 控制提示文本的方向和间距。

### 禁用状态

TooltipProvider 的 disableHoverableContent 可关闭内容的悬浮保持行为。

### 键盘

Tooltip 通过焦点触发，支持键盘用户在焦点可见时查看提示。

### RTL

方向由 DirectionProvider 控制。

## 变体

Tooltip 没有公开视觉变体；side 与 sideOffset 来自 Reka Popper 定位属性。

## 可访问性

Tooltip 复用 Reka UI 的 tooltip 角色，触发元素需要描述性文本；纯图标按钮的 Tooltip 应配合 aria-label。Tooltip 本身不应包含交互元素。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Tooltip v-model:open` | `boolean` | `undefined` | 提示的受控打开状态。 |
| `Tooltip defaultOpen` | `boolean` | `false` | 非受控初始打开状态。 |
| `TooltipProvider delayDuration` | `number` | `300` | 触发打开前的延迟毫秒数。 |
| `TooltipProvider disableHoverableContent` | `boolean` | `false` | 关闭鼠标悬浮在内容上时的保持打开行为。 |
| `TooltipProvider skipDelayDuration` | `number` | `300` | 工具提示切换之间的跳过延迟。 |
| `TooltipContent side / align` | `PopperContentProps` | `'top' / 'center'` | 提示方向与对齐。 |
| `TooltipContent sideOffset` | `number` | `4` | 提示与触发器的偏移像素。 |
| `TooltipArrow width / height` | `number` | `10 / 5` | 箭头的宽度与高度。 |
