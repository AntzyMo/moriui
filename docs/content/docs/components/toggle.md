---
title: Toggle 切换控件
description: 用于切换控件场景的 MoriUI 组件。
---

# Toggle 切换控件

用于切换控件场景的 MoriUI 组件。

## 导入

```ts
import { Toggle } from 'moriui'
```

## 示例

### 概览

描边小号收藏按钮保持受控状态。

::component-preview{name="toggle-demo"}
::

### 描边

两个独立 Toggle 控制斜体与粗体。

::component-preview{name="toggle-outline"}
::

### 图标与文字

默认变体组合图标和可读文字。

::component-preview{name="toggle-text"}
::

### 尺寸

sm、default 与 lg 覆盖常用密度。

::component-preview{name="toggle-sizes"}
::

### 禁用

默认与描边变体都保留禁用语义。

::component-preview{name="toggle-disabled"}
::

### RTL

阿拉伯语收藏按钮沿 RTL 内容流排列。

::component-preview{name="toggle-rtl"}
::

## 使用说明

### 切换状态

Toggle 通过 boolean v-model 表达 on/off，并输出 aria-pressed 与 data-state。

### 变体与尺寸

variant 支持 default/outline，size 支持 sm/default/lg；图标与文字可直接放入默认插槽。

### 禁用状态

disabled 使用原生 button 禁用语义并阻止 pressed 状态变化。

### RTL

图标与文字按内容流排列，Toggle 自身的 on/off 行为不依赖书写方向。

## 变体

Toggle 的 variant 支持 default/outline，size 支持 sm/default/lg；on、off、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。

## 可访问性

Toggle 复用 Reka UI 的原生 button、aria-pressed、Space/Enter 与隐藏表单输入。仅图标 Toggle 必须提供 aria-label；连续选择一组相关状态时应使用 ToggleGroup，而不是手动组合多个独立 Toggle。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Toggle v-model` | `boolean \| null` | `undefined` | 受控 pressed 状态。 |
| `Toggle defaultValue` | `boolean` | `undefined` | 非受控初始 pressed 状态。 |
| `Toggle variant` | `'default' \| 'outline'` | `'default'` | 切换按钮视觉层级。 |
| `Toggle size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 切换按钮尺寸。 |
| `Toggle disabled / required` | `boolean` | `false` | 禁用交互与隐藏表单控件的必填语义。 |
| `Toggle name` | `string` | `undefined` | 独立 Toggle 作为表单控件时的字段名。 |
| `Toggle as / asChild` | `string \| Component / boolean` | `'button' / false` | 元素组合能力；默认输出原生 button。 |
