---
title: Button 按钮
description: 触发操作的主要交互元素。
group: 表单
related:
  - button-group
  - toggle
---

## 引入

```vue
import { Button } from 'moriui'
```

## 示例

### 概览

::component-preview{name="button-demo"}
文字按钮与仅图标按钮的基础组合。
::

### 尺寸

::component-preview{name="button-size"}
::

### 默认

::component-preview{name="button-default"}
::

### 描边

::component-preview{name="button-outline"}
::

### 次要

::component-preview{name="button-secondary"}
::

### 幽灵

::component-preview{name="button-ghost"}
::

### 破坏性

::component-preview{name="button-destructive"}
::

### 链接样式

::component-preview{name="button-link"}
::

### 图标按钮

::component-preview{name="button-icon"}
::

### 带图标

::component-preview{name="button-with-icon"}
::

### 圆形

::component-preview{name="button-rounded"}
::

### 加载中

::component-preview{name="button-spinner"}
::

### 按钮组

::component-preview{name="button-group-demo"}
::

### 渲染为链接

::component-preview{name="button-render"}
::

### RTL

::component-preview{name="button-rtl"}
::

Button 的 variant 支持 default、outline、secondary、ghost、destructive、link。
size 支持 xs、sm、default、lg 及四种 icon 尺寸。

## API 参考

### Button Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'default' \| 'outline' \| 'secondary' \| 'ghost' \| 'destructive' \| 'link'` | `'default'` | 按钮视觉层级 |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'icon-xs' \| 'icon-sm' \| 'icon' \| 'icon-lg'` | `'default'` | 按钮尺寸 |
| `disabled` | `boolean` | `false` | 原生 button 时阻止交互 |
| `as / asChild` | `string \| Component / boolean` | `'button' / false` | 选择语义元素或将样式合并到唯一子元素 |
| `dataSlot` | `string` | `'button'` | 覆盖公开 data-slot，供复合组件使用 |

## 无障碍

Button 默认输出原生 button，保留键盘、焦点与 disabled 语义。仅图标按钮必须提供 `aria-label`；链接应使用 `as="a"` 和有效 `href`。禁用状态使用 `disabled`。
