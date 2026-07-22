---
title: Accordion 折叠内容
description: 用于折叠内容场景的 MoriUI 组件。
---

# Accordion 折叠内容

用于折叠内容场景的 MoriUI 组件。

## 导入

```ts
import { Accordion, AccordionContent, AccordionIcon, AccordionItem, AccordionTrigger } from 'moriui'
```

## 示例

### 概览

常见问答的折叠面板。

::component-preview{name="accordion-demo"}
::

### 基础

单项目展开的折叠面板。

::component-preview{name="accordion-basic"}
::

### 多项展开

同时展开多个项目。

::component-preview{name="accordion-multiple"}
::

### 禁用

禁用单个项目。

::component-preview{name="accordion-disabled"}
::

### 边框

带边框的折叠面板。

::component-preview{name="accordion-borders"}
::

### 卡片

包含在 Card 中的折叠面板。

::component-preview{name="accordion-card"}
::

### RTL

从右到左的折叠面板。

::component-preview{name="accordion-rtl"}
::

## 使用说明

### 组合方式

Accordion 基于 Reka UI 构建，由 Item、Trigger 和 Content 组成；AccordionIcon 提供默认展开指示图标。

### 多项展开

添加 multiple 属性可同时展开多个项目。

### 禁用项目

AccordionItem 支持 disabled 属性，禁用后无法展开。

### RTL

Accordion 内容沿外围 dir 排列。

## 变体

Accordion 没有视觉变体；multiple、disabled 由 Reka UI 属性驱动。

## 可访问性

Accordion 复用 Reka UI 的 Accordion ARIA，包括区域角色、方向键导航、Enter/Space 展开收起和 aria-expanded。Trigger 应包含清晰的标题文本。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Accordion v-model` | `string \| string[]` | `undefined` | 当前展开项的值（single）或值数组（multiple）。 |
| `Accordion defaultValue` | `string \| string[]` | `undefined` | 非受控展开项的初始值。 |
| `Accordion multiple` | `boolean` | `false` | 允许多项同时展开。 |
| `AccordionItem value` | `string` | `—` | 必填，唯一标识该项目。 |
| `AccordionItem disabled` | `boolean` | `false` | 禁用该项目。 |
| `AccordionTrigger class` | `HTMLAttributes["class"]` | `undefined` | 合并到触发器的调用方类。 |
| `AccordionContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到内容区域的调用方类。 |
| `AccordionIcon class` | `HTMLAttributes["class"]` | `undefined` | 合并到展开图标的调用方类。 |
| `Accordion as / asChild` | `string \| Component / boolean` | `'div' / false` | 来自 Reka Primitive 的元素组合能力。 |
