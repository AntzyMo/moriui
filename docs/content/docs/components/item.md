---
title: Item 信息条目
description: 列表形式的信息条目。
group: 基础
related:
  - avatar
  - card
---

## 引入

```vue
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from 'moriui'
```

## 示例

### 概览

::component-preview{name="item-demo"}
媒体、内容和状态操作组成完整条目。
::

### 变体

::component-preview{name="item-variant"}
对比三种公开表面。
::

### 尺寸

::component-preview{name="item-size"}
对比 default、sm 与 xs。
::

### 图标

::component-preview{name="item-icon"}
图标媒体用于文件类条目。
::

### 头像

::component-preview{name="item-avatar"}
头像媒体用于人员条目。
::

### 图片

::component-preview{name="item-image"}
图片媒体用于项目封面。
::

### 分组

::component-preview{name="item-group"}
ItemGroup 与 ItemSeparator 构造列表。
::

### 页眉

::component-preview{name="item-header"}
Header 承载元信息。
::

### 链接

::component-preview{name="item-link"}
通过 as 渲染为完整链接条目。
::

### 操作入口

::component-preview{name="item-dropdown"}
Actions 放置条目级更多操作入口。
::

### RTL

::component-preview{name="item-rtl"}
条目支持 RTL 文本流。
::

Item 通过 Media、Content、Actions、Header、Footer 组合结构；ItemGroup 与 ItemSeparator 组织列表。展示信息与操作入口使用 Item；表单标签、描述、校验和控件关系应使用 Field。variant 支持 default、outline 与 muted，用于区分条目表面层级。size 支持 default、sm 与 xs，并同步调整间距和媒体尺寸。条目继承 dir，媒体、内容和操作按逻辑方向排列。

Item variant 支持 default、outline、muted；size 支持 default、sm、xs；ItemMedia variant 支持 default、icon、image。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Item variant` | `'default' \| 'outline' \| 'muted'` | `'default'` | 条目表面层级 |
| `Item size` | `'default' \| 'sm' \| 'xs'` | `'default'` | 条目密度 |
| `ItemGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目分组的调用方类 |
| `ItemSeparator class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目分隔线的调用方类 |
| `ItemMedia variant` | `'default' \| 'icon' \| 'image'` | `'default'` | 媒体区域形态 |
| `ItemContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目内容区的调用方类 |
| `ItemTitle class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目标题的调用方类 |
| `ItemDescription class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目说明的调用方类 |
| `ItemActions class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目操作区的调用方类 |
| `ItemHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目页眉的调用方类 |
| `ItemFooter class` | `HTMLAttributes["class"]` | `undefined` | 合并到条目页脚的调用方类 |
| `Item as / asChild` | `string \| Component / boolean` | `'div' / false` | 将 Item 渲染为语义合适的元素 |

## 无障碍

可点击整行应把 Item 渲染为 a 或 button，不能依赖 div 点击；ItemGroup 使用 list 语义时，其 Item 子项应显式传入 role=listitem，纯视觉分隔线应从无障碍树隐藏；标题和说明保持可读文本，图标媒体按用途提供 aria-hidden 或名称。
