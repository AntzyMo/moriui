---
title: Typography 文本排版
description: 用于文本排版场景的 MoriUI 组件。
---

# Typography 文本排版

用于文本排版场景的 MoriUI 组件。

## 导入

```ts
import { Typography } from 'moriui'
```

## 示例

### 概览

组合标题、说明与正文。

::component-preview{name="typography-demo"}
::

### h1

页面主标题。

::component-preview{name="typography-h1"}
::

### h2

主要章节标题。

::component-preview{name="typography-h2"}
::

### h3

次级章节标题。

::component-preview{name="typography-h3"}
::

### h4

局部内容标题。

::component-preview{name="typography-h4"}
::

### 段落

默认正文排版。

::component-preview{name="typography-p"}
::

### 引用

用 as 保留引用语义。

::component-preview{name="typography-blockquote"}
::

### 表格

表格使用原生语义与 Nova Token。

::component-preview{name="typography-table"}
::

### 列表

用 as 渲染语义列表。

::component-preview{name="typography-list"}
::

### 行内代码

code 类型展示代码片段。

::component-preview{name="typography-inline-code"}
::

### 导语

通过公开 class 形成导语层级。

::component-preview{name="typography-lead"}
::

### 大号文字

强调短文本。

::component-preview{name="typography-large"}
::

### 小号文字

body-sm 用于辅助信息。

::component-preview{name="typography-small"}
::

### 弱化文字

color=muted 降低视觉层级。

::component-preview{name="typography-muted"}
::

### RTL

逻辑方向对齐适配 RTL。

::component-preview{name="typography-rtl"}
::

## 使用说明

### 排版类型

MoriUI 提供 h1-h6、body、body-sm、body-xs 与 code 类型，并默认映射到相应语义元素。

### RTL

align=start/end 使用逻辑方向，在 RTL 页面中无需手动交换左右对齐。

## 变体

type 控制语义排版，align 控制逻辑对齐，color 支持 default/muted，weight 支持 normal/medium/semibold/bold，并可开启 truncate。

## 可访问性

优先让 type 与真实标题层级一致；使用 as 覆盖时仍要维护页面大纲。不要仅用字重或颜色表达层级，RTL 内容应设置正确 lang/dir。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'body' \| 'body-sm' \| 'body-xs' \| 'code' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'body'` | 排版类型与默认语义元素。 |
| `align` | `'start' \| 'center' \| 'end' \| 'justify'` | `'start'` | 文字逻辑方向对齐。 |
| `color` | `'default' \| 'muted'` | `'default'` | 文字颜色层级。 |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `undefined` | 字重。 |
| `truncate` | `boolean` | `false` | 单行截断溢出内容。 |
| `as / asChild` | `string \| Component / boolean` | `按 type 推导 / false` | 覆盖默认语义元素或合并到唯一子元素。 |
