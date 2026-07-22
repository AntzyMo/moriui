---
title: Calendar 日期日历
description: 用于日期日历场景的 MoriUI 组件。
---

# Calendar 日期日历

用于日期日历场景的 MoriUI 组件。

## 导入

```ts
import { Calendar } from 'moriui'
```

## 示例

### 概览

单日日期选择。

::component-preview{name="calendar-demo"}
::

### 基础

最小化的日历。

::component-preview{name="calendar-basic"}
::

### 多选

多次日期选择。

::component-preview{name="calendar-multiple"}
::

### 范围

选择日期区间。

::component-preview{name="calendar-range"}
::

### 预设

快捷预设日期。

::component-preview{name="calendar-presets"}
::

### 时间

日期时间选择。

::component-preview{name="calendar-time"}
::

### 标题

自定义月份标题。

::component-preview{name="calendar-caption"}
::

### 自定义日期

在日期格中展示额外信息。

::component-preview{name="calendar-custom-days"}
::

### 周数

左侧显示周数。

::component-preview{name="calendar-week-numbers"}
::

### RTL

从右到左的日历布局。

::component-preview{name="calendar-rtl"}
::

## 使用说明

### 选择模式

Calendar 通过 multiple 属性控制单选或多选；day 插槽可自定义日期格内容。

### 自定义标题

heading 插槽替换默认月份/年份标题。

### 自定义日期格

day 插槽接收 dayValue/disabled/today/selected 属性，支持自定义渲染。

### RTL

日历网格和方向键遵循 dir。

## 变体

Calendar 没有视觉变体；multiple 控制多选，通过 Reka UI DateField 管理日期状态。

## 可访问性

Calendar 复用 Reka UI Calendar 的 grid ARIA、方向键导航。每个日期格有正确标签。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Calendar v-model` | `DateValue \| DateValue[] \| null` | `undefined` | 当前选择的日期。 |
| `Calendar multiple` | `boolean` | `false` | 允许多选。 |
| `Calendar placeholder` | `DateValue` | `今天` | 日历初始聚焦月份。 |
| `Calendar numberOfMonths` | `number` | `1` | 同时显示的月份数量。 |
| `Calendar locale` | `string` | `'en'` | 日历的语言区域。 |
