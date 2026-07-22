---
title: Card 内容卡片
description: 用于内容卡片场景的 MoriUI 组件。
---

# Card 内容卡片

用于内容卡片场景的 MoriUI 组件。

## 导入

```ts
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'moriui'
```

## 示例

### 概览

完整卡片结构与操作。

::component-preview{name="card-demo"}
::

### 小尺寸

size=sm 适配紧凑布局。

::component-preview{name="card-small"}
::

### 自定义间距

覆盖 --card-spacing 调整密度。

::component-preview{name="card-spacing"}
::

### 边到边内容

媒体区域可以跨越内容插槽的内边距。

::component-preview{name="card-edge-to-edge"}
::

### 图片

媒体、标题与描述组成内容卡片。

::component-preview{name="card-image"}
::

### RTL

卡片在 RTL 页面中保持语义结构。

::component-preview{name="card-rtl"}
::

## 使用说明

### 组合方式

用 Header、Title、Description、Action、Content 与 Footer 形成稳定内容层级。

### 间距变量

Card 使用公开局部 Token --card-spacing；size 会设置默认值，调用方可按场景覆盖。

### RTL

卡片布局继承 dir，标题、说明和动作在 RTL 文本流中保持正确顺序。

## 变体

Card size 支持 default 与 sm；--card-spacing 是公开的组件局部 Token。

## 可访问性

Card 是布局容器，不自动建立 landmark；按内容需要使用 aria-labelledby 或在外围选择 article/section。标题层级应与页面大纲一致。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Card size` | `'default' \| 'sm'` | `'default'` | 卡片的密度尺寸，并同步设置 data-size。 |
| `CardHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片页眉的调用方类。 |
| `CardTitle class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片标题的调用方类。 |
| `CardDescription class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片说明的调用方类。 |
| `CardAction class` | `HTMLAttributes["class"]` | `undefined` | 合并到页眉操作区的调用方类。 |
| `CardContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片内容区的调用方类。 |
| `CardFooter class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片页脚的调用方类。 |
