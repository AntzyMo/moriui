---
title: Button 操作按钮
description: 用于触发操作的可访问按钮组件。
---

# Button 操作按钮

Button 默认渲染原生 `button`，并提供一致的尺寸、视觉层级和可组合的语义元素能力。

## 导入

```ts
import { Button } from 'moriui'
```

## 示例

### 概览

文字按钮与仅图标按钮的基础组合。

::component-preview{name="button-demo"}
::

### 尺寸

文字和图标尺寸覆盖 xs 到 lg。

::component-preview{name="button-size"}
::

### 默认

高强调的主要操作。

::component-preview{name="button-default"}
::

### 描边

中性描边操作。

::component-preview{name="button-outline"}
::

### 次要

弱化的次级操作。

::component-preview{name="button-secondary"}
::

### 幽灵

工具栏中的低强调操作。

::component-preview{name="button-ghost"}
::

### 破坏性

表达删除等不可逆动作。

::component-preview{name="button-destructive"}
::

### 链接样式

保留按钮语义的链接视觉。

::component-preview{name="button-link"}
::

### 图标按钮

仅图标按钮使用 icon 尺寸和可访问名称。

::component-preview{name="button-icon"}
::

### 带图标

用 `data-icon` 标识逻辑方向。

::component-preview{name="button-with-icon"}
::

### 圆形

调用方 class 可覆盖圆角。

::component-preview{name="button-rounded"}
::

### 加载中

禁用按钮与旋转图标表达进行中状态。

::component-preview{name="button-spinner"}
::

### 按钮组

相关操作可放入 ButtonGroup。

::component-preview{name="button-group-demo"}
::

### 渲染为链接

通过 `as="a"` 输出语义正确的链接。

::component-preview{name="button-render"}
::

### RTL

阿拉伯语按钮沿 RTL 内容流排列。

::component-preview{name="button-rtl"}
::

## 鼠标指针

MoriUI 不覆盖可用按钮的默认鼠标指针；如项目需要 pointer，应在应用层为非禁用按钮配置。禁用按钮使用 cursor-not-allowed。

## 语义链接

MoriUI Button 可通过 `as="a"` 渲染真实链接；不要把链接行为伪装成按钮事件。

## RTL 支持

按钮内容沿逻辑方向排列，inline-start/inline-end 图标会随 dir 保持自然顺序。

## 变体

`variant` 支持 `default`、`outline`、`secondary`、`ghost`、`destructive`、`link`；`size` 支持 `xs`、`sm`、`default`、`lg` 及四种 icon 尺寸。

## 可访问性

默认输出原生 `button` 并保留键盘、焦点与 disabled 语义。仅图标按钮必须提供 `aria-label`；链接应使用 `as="a"` 和有效 href。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'outline' \| 'secondary' \| 'ghost' \| 'destructive' \| 'link'` | `'default'` | 按钮视觉层级。 |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'icon-xs' \| 'icon-sm' \| 'icon' \| 'icon-lg'` | `'default'` | 按钮尺寸。 |
| `disabled` | `boolean` | `false` | 原生 button 时阻止交互。 |
| `as / asChild` | `string \| Component / boolean` | `'button' / false` | 选择语义元素或将样式合并到唯一子元素。 |
| `dataSlot` | `string` | `'button'` | 覆盖公开 data-slot，供复合组件使用。 |
