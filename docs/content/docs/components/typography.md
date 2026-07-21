---
title: Typography 文本排版
description: 一致化文本排版组件。
group: 基础
related:
  - card
  - direction
---

## 引入

```vue
import { Typography } from 'moriui'
```

## 示例

### 概览

::component-preview{name="typography-demo"}
组合标题、说明与正文。
::

### h1

::component-preview{name="typography-h1"}
页面主标题。
::

### h2

::component-preview{name="typography-h2"}
主要章节标题。
::

### h3

::component-preview{name="typography-h3"}
次级章节标题。
::

### h4

::component-preview{name="typography-h4"}
局部内容标题。
::

### 段落

::component-preview{name="typography-p"}
默认正文排版。
::

### 引用

::component-preview{name="typography-blockquote"}
用 as 保留引用语义。
::

### 表格

::component-preview{name="typography-table"}
表格使用原生语义与 Nova Token。
::

### 列表

::component-preview{name="typography-list"}
用 as 渲染语义列表。
::

### 行内代码

::component-preview{name="typography-inline-code"}
code 类型展示代码片段。
::

### 导语

::component-preview{name="typography-lead"}
通过公开 class 形成导语层级。
::

### 大号文字

::component-preview{name="typography-large"}
强调短文本。
::

### 小号文字

::component-preview{name="typography-small"}
body-sm 用于辅助信息。
::

### 弱化文字

::component-preview{name="typography-muted"}
color=muted 降低视觉层级。
::

### RTL

::component-preview{name="typography-rtl"}
逻辑方向对齐适配 RTL。
::

MoriUI 提供 h1-h6、body、body-sm、body-xs 与 code 类型，并默认映射到相应语义元素。align=start/end 使用逻辑方向，在 RTL 页面中无需手动交换左右对齐。

type 控制语义排版，align 控制逻辑对齐，color 支持 default/muted，weight 支持 normal/medium/semibold/bold，并可开启 truncate。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'body' \| 'body-sm' \| 'body-xs' \| 'code' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'body'` | 排版类型与默认语义元素 |
| `align` | `'start' \| 'center' \| 'end' \| 'justify'` | `'start'` | 文字逻辑方向对齐 |
| `color` | `'default' \| 'muted'` | `'default'` | 文字颜色层级 |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `undefined` | 字重 |
| `truncate` | `boolean` | `false` | 单行截断溢出内容 |
| `as / asChild` | `string \| Component / boolean` | 按 type 推导 / false | 覆盖默认语义元素或合并到唯一子元素 |

## 无障碍

优先让 type 与真实标题层级一致；使用 as 覆盖时仍要维护页面大纲。不要仅用字重或颜色表达层级，RTL 内容应设置正确 lang/dir。
