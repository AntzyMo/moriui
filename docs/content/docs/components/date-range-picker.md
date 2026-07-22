---
title: Date Range Picker 日期区间
description: 用于日期区间场景的 MoriUI 组件。
---

# Date Range Picker 日期区间

用于日期区间场景的 MoriUI 组件。

## 导入

```ts
import { DateRangePicker } from 'moriui'
```

## 示例

### 概览

选择日期区间。

::component-preview{name="date-range-picker-demo"}
::

### 基础

最小化区间选择。

::component-preview{name="date-range-picker-basic"}
::

### 预设

快捷预设日期范围。

::component-preview{name="date-range-picker-presets"}
::

### RTL

从右到左的日期区间选择。

::component-preview{name="date-range-picker-rtl"}
::

## 使用说明

### 组合方式

DateRangePicker 为日期区间选择的包装组件，提供起止日期双输入。

### RTL

方向由 DirectionProvider 控制。

## 变体

DateRangePicker 没有视觉变体；弹层定位由 Popper 控制。

## 可访问性

DateRangePicker 将 Calendar range 模式与双输入字段组合。输入应有各自的 Label 或 aria-label。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `DateRangePicker v-model` | `{ start: DateValue \| null, end: DateValue \| null }` | `undefined` | 起止日期对象。 |
| `DateRangePicker placeholder` | `DateValue` | `undefined` | 无选择时的占位月份。 |
