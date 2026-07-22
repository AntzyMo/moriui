---
title: Slider 范围滑杆
description: 用于范围滑杆场景的 MoriUI 组件。
---

# Slider 范围滑杆

用于范围滑杆场景的 MoriUI 组件。

## 导入

```ts
import { Slider, SliderRange, SliderThumb, SliderTrack } from 'moriui'
```

## 示例

### 概览

单控制点选择 0 到 100 的值。

::component-preview{name="slider-demo"}
::

### 范围

两个 Thumb 选择起点与终点。

::component-preview{name="slider-range"}
::

### 多个控制点

三个值创建三个可独立操作的 Thumb。

::component-preview{name="slider-multiple"}
::

### 垂直

两条垂直 Slider 使用上下方向键。

::component-preview{name="slider-vertical"}
::

### 受控

v-model 实时显示两个温度边界。

::component-preview{name="slider-controlled"}
::

### 禁用

disabled 保留当前值并阻止操作。

::component-preview{name="slider-disabled"}
::

### RTL

水平滑杆在 RTL 方向中调整值。

::component-preview{name="slider-rtl"}
::

## 使用说明

### 组合方式

Slider 组合 Track、Range 与一个或多个 Thumb；Thumb 数量应与 v-model 数组长度一致。

### 范围与多控制点

两个值表示范围，更多值创建多个控制点；minStepsBetweenThumbs 可约束相邻值间距。

### 垂直方向

orientation="vertical" 切换布局与上下方向键，控件仍使用同一 Track/Range/Thumb 组合。

### 受控与禁用

v-model 实时同步 number[]；valueCommit 只在一次拖动或键盘操作结束后触发，disabled 阻止交互。

### RTL

水平 Slider 的方向键与值增长方向遵循 dir，垂直方向不受文字流影响。

## 变体

Slider 没有公开视觉或尺寸变体；orientation、disabled、dir 与多 Thumb 状态由 Reka UI 驱动。

## 可访问性

Slider 复用 Reka UI 的 slider ARIA、Home/End、Page Up/Page Down、方向键和隐藏表单输入。每个 Thumb 都应通过 aria-label 或关联标签获得名称；范围 Slider 需分别说明起点和终点。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Slider v-model` | `number[] \| null` | `[0]` | 按 Thumb 顺序排列的当前值。 |
| `Slider defaultValue` | `number[]` | `[0]` | 非受控初始值，同时决定初始 Thumb 数量。 |
| `Slider min / max / step` | `number` | `0 / 100 / 1` | 数值范围与步进。 |
| `Slider orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局与键盘导航方向。 |
| `Slider disabled / inverted` | `boolean` | `false` | 禁用交互与反转视觉值方向。 |
| `Slider minStepsBetweenThumbs` | `number` | `0` | 相邻 Thumb 之间允许的最小步数。 |
| `Slider thumbAlignment` | `'contain' \| 'overflow'` | `'contain'` | Thumb 在轨道边界内的对齐方式。 |
| `Slider @valueCommit` | `(value: number[]) => void` | `—` | 一次值修改交互结束时触发。 |
