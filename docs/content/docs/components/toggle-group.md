---
title: Toggle Group 切换控件组
description: 一组可保持选中状态的切换按钮组合。
group: 表单
related:
  - button-group
  - toggle
---

## 引入

```vue
import { ToggleGroup, ToggleGroupItem } from 'moriui'
```

## 示例

### 概览

::component-preview{name="toggle-group-demo"}
multiple 模式控制多个文字格式。
::

### 描边

::component-preview{name="toggle-group-outline"}
single 模式在全部与未接筛选之间切换。
::

### 尺寸

::component-preview{name="toggle-group-sizes"}
sm 与 default 展示不同密度。
::

### 间距

::component-preview{name="toggle-group-spacing"}
spacing 调整 Item 之间的组件局部间距。
::

### 垂直

::component-preview{name="toggle-group-vertical"}
垂直多选组使用上下方向键。
::

### 禁用

::component-preview{name="toggle-group-disabled"}
根 disabled 阻止整组状态变化。
::

### 自定义字重

::component-preview{name="toggle-group-font-weight-selector"}
Item 默认插槽组合字样与辅助标签。
::

### RTL

::component-preview{name="toggle-group-rtl"}
阿拉伯语单选组使用 RTL 键盘顺序。
::

type="single" 使用单个 AcceptableValue，type="multiple" 使用值数组；也可由 v-model/defaultValue 的形状推断。根组件统一向 Item 提供 variant、size 和 spacing，单个 Item 仍可覆盖视觉变体或尺寸。orientation="vertical" 切换布局与上下方向键；默认 horizontal 使用左右方向键。根 disabled 禁用整组，Item 也可单独禁用；默认插槽可组合图标、文字和自定义内容。水平组的左右方向键顺序遵循 dir，垂直组继续使用上下方向键。

ToggleGroup 的 variant 支持 default/outline，size 支持 sm/default/lg，orientation 支持 horizontal/vertical；spacing 默认 2，并通过局部 Token 控制项目间距。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `ToggleGroup v-model` | `AcceptableValue \| AcceptableValue[]` | `undefined` | single 单值或 multiple 值数组 |
| `ToggleGroup type` | `'single' \| 'multiple'` | 按值形状推断 | 显式指定单选或多选模式 |
| `ToggleGroup defaultValue` | `AcceptableValue \| AcceptableValue[]` | `undefined` | 非受控初始选择 |
| `ToggleGroup variant` | `'default' \| 'outline'` | `'default'` | 整组 Item 的默认视觉层级 |
| `ToggleGroup size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 整组 Item 的默认尺寸 |
| `ToggleGroup spacing` | `number` | `2` | Item 之间的间距倍数 |
| `ToggleGroup orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局与方向键导航方向 |
| `ToggleGroup disabled / rovingFocus / loop` | `boolean` | `false / true / true` | 整组禁用、移动焦点与循环导航 |
| `ToggleGroupItem value` | `AcceptableValue` | `—` | 必填项目值 |
| `ToggleGroupItem disabled` | `boolean` | `false` | 单独禁用当前项目 |

## 无障碍

ToggleGroup 复用 Reka UI 的 group、aria-pressed、roving focus、方向键与循环导航。根组件需要 aria-label 或 aria-labelledby；每个仅图标 Item 必须有 aria-label，orientation 应与视觉排列一致。
