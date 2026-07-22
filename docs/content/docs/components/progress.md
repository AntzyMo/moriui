---
title: Progress 完成进度
description: 用于完成进度场景的 MoriUI 组件。
---

# Progress 完成进度

用于完成进度场景的 MoriUI 组件。

## 导入

```ts
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from 'moriui'
```

## 示例

### 概览

动态进度条展示。

::component-preview{name="progress-demo"}
::

### 受控

受控 value 驱动进度。

::component-preview{name="progress-controlled"}
::

### 标签

显示百分比文字。

::component-preview{name="progress-label"}
::

### RTL

从右到左的进度条。

::component-preview{name="progress-rtl"}
::

## 使用说明

### 组合方式

Progress 由 Track、Indicator、Label 和 Value 组成，通过 value 控制进度百分比。

### 受控

使用 value prop 控制进度值，支持动态更新。

### 标签

ProgressLabel 和 ProgressValue 提供百分比文字展示。

### RTL

进度条方向在 RTL 页面中自动翻转。

## 变体

Progress 没有视觉变体；value 范围 0-100，indeterminate 使用动画效果。

## 可访问性

Progress 复用 Reka UI 的 progressbar 角色、aria-valuenow、aria-valuemin、aria-valuemax。Label 应描述正在进行的任务。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Progress value` | `number \| null` | `0` | 当前进度值（0-100）。 |
| `Progress max` | `number` | `100` | 最大值。 |
| `ProgressTrack class` | `HTMLAttributes["class"]` | `undefined` | 合并到轨道的调用方类。 |
| `ProgressIndicator class` | `HTMLAttributes["class"]` | `undefined` | 合并到指示器的调用方类。 |
| `ProgressLabel class` | `HTMLAttributes["class"]` | `undefined` | 合并到标签文字的调用方类。 |
| `ProgressValue class` | `HTMLAttributes["class"]` | `undefined` | 合并到百分比值的调用方类。 |
