---
title: Chart 数据图形
description: 用于数据图形场景的 MoriUI 组件。
---

# Chart 数据图形

用于数据图形场景的 MoriUI 组件。

## 导入

```ts
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from 'moriui'
```

## 示例

### 概览

柱状图展示数据。

::component-preview{name="chart-demo"}
::

### 提示框

图表数据点提示。

::component-preview{name="chart-example-tooltip"}
::

### 图例

图表系列图例。

::component-preview{name="chart-example-legend"}
::

### RTL

从右到左的图表布局。

::component-preview{name="chart-rtl"}
::

## 使用说明

### 组合方式

Chart 基于 Unovis 构建，使用 ChartContainer 包裹 Vis 图表组件，通过 ChartTooltipContent 和 ChartLegendContent 提供交互辅助。

### RTL

图表坐标轴在 RTL 页面中自动翻转。

## 变体

Chart 没有视觉变体；使用不同 Vis 组件（VisBar、VisLine、VisArea 等）表达数据。

## 可访问性

ChartContainer 生成的 SVG 图表应提供可访问的标题和描述。tooltip 应确保键盘用户可达。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `ChartContainer config` | `ChartConfig` | `—` | 图表配置，定义系列名称、颜色和标签。 |
| `ChartContainer class` | `HTMLAttributes["class"]` | `undefined` | 合并到图表容器的调用方类。 |
| `ChartTooltipContent indicator` | `ChartTooltipIndicator` | `'dot'` | 提示框中的指示器类型。 |
| `ChartLegendContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到图例的调用方类。 |
