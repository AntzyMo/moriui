---
title: Date Picker 单日选择
description: 用于单日选择场景的 MoriUI 组件。
---

# Date Picker 单日选择

用于单日选择场景的 MoriUI 组件。

## 导入

```ts
import { DatePicker } from 'moriui'
```

## 示例

### 概览

从弹层中选择日期。

::component-preview{name="date-picker-demo"}
::

### 基础

最小化的日期选择。

::component-preview{name="date-picker-basic"}
::

### 范围

选择日期区间。

::component-preview{name="date-picker-range"}
::

### 输入

手动输入日期。

::component-preview{name="date-picker-input"}
::

### 生日

选择出生日期。

::component-preview{name="date-picker-dob"}
::

### 时间

日期时间选择。

::component-preview{name="date-picker-time"}
::

### 自然语言

自然语言输入日期。

::component-preview{name="date-picker-natural-language"}
::

### RTL

从右到左的日期选择。

::component-preview{name="date-picker-rtl"}
::

## 使用说明

### 组合方式

DatePicker 组合 Calendar 和 Popover，通过 Trigger 打开日历弹层。

### 预设

与日历 preset 组合可提供快捷日期范围。

### RTL

弹层定位与日历方向遵循 dir。

## 变体

DatePicker 没有视觉变体；弹层定位由 Popper 控制。

## 可访问性

DatePicker 将 Calendar 的 grid 语义放置在 Popover 弹层中，焦点在打开时移动到日历。输入框应有 Label 或 aria-label。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `DatePicker v-model` | `DateValue \| null` | `undefined` | 当前选中日期。 |
| `DatePicker placeholder` | `DateValue` | `undefined` | 无选择时的占位日期。 |
| `DatePickerInput class` | `HTMLAttributes["class"]` | `undefined` | 合并到输入框的调用方类。 |
| `DatePickerContent side / align` | `PopperContentProps` | `'bottom' / 'center'` | 弹层定位属性。 |
