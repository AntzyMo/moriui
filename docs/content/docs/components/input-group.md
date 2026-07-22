---
title: Input Group 输入组合
description: 用于输入组合场景的 MoriUI 组件。
---

# Input Group 输入组合

用于输入组合场景的 MoriUI 组件。

## 导入

```ts
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from 'moriui'
```

## 示例

### 概览

搜索图标、输入和结果数量共享边界。

::component-preview{name="input-group-demo"}
::

### 行内起始

图标位于逻辑起始侧。

::component-preview{name="input-group-inline-start"}
::

### 行内结束

操作位于逻辑结束侧。

::component-preview{name="input-group-inline-end"}
::

### 块级起始

标题附加内容位于控件上方。

::component-preview{name="input-group-block-start"}
::

### 块级结束

辅助内容位于控件下方。

::component-preview{name="input-group-block-end"}
::

### 图标

组合起始与结束图标。

::component-preview{name="input-group-icon"}
::

### 文字

货币、协议和单位作为附加文字。

::component-preview{name="input-group-text"}
::

### 按钮

复制、收藏等操作位于输入边界内。

::component-preview{name="input-group-button"}
::

### 快捷键

Kbd 提示全局搜索快捷键。

::component-preview{name="input-group-kbd"}
::

### 菜单入口

紧凑按钮提供更多选择入口。

::component-preview{name="input-group-dropdown"}
::

### 加载状态

Spinner 与状态文字表达进行中任务。

::component-preview{name="input-group-spinner"}
::

### 多行输入

MoriUI Textarea 与块级 Addon 组成多行编辑器。

::component-preview{name="input-group-textarea"}
::

### 自定义控件

自定义自动增高 textarea 保持统一焦点处理。

::component-preview{name="input-group-custom"}
::

### RTL

逻辑对齐在 RTL 中保持自然顺序。

::component-preview{name="input-group-rtl"}
::

## 使用说明

### 组合方式

InputGroup 组合 InputGroupInput、Addon、Button 与 Text；MoriUI 当前不导出 InputGroupTextarea。

### 附加内容对齐

Addon align 支持 inline-start、inline-end、block-start 与 block-end；DOM 中应放在控件之后，以保持焦点导航。

### 自定义控件

MoriUI Textarea 等控件可作为 InputGroup 的自定义控制区，并与块级附加内容共同布局。

### RTL

inline-start 和 inline-end 是逻辑方向，在 RTL 中自然翻转。

## 变体

InputGroupAddon align 支持 inline-start/inline-end/block-start/block-end；InputGroupButton size 支持 xs/sm/icon-xs/icon-sm，variant 复用 Button。

## 可访问性

InputGroup 不替代输入标签，仍需 FieldLabel 或 aria-label。Addon 应在 DOM 中位于控件之后；点击非交互附加内容会聚焦 data-slot="input-group-control"，按钮、链接等交互元素保持独立焦点。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `InputGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到 role="group" 根容器。 |
| `InputGroupAddon align` | `'inline-start' \| 'inline-end' \| 'block-start' \| 'block-end'` | `'inline-start'` | 附加内容的逻辑位置。 |
| `InputGroupInput v-model` | `string` | `''` | 输入组合中的受控字符串值。 |
| `InputGroupInput defaultValue` | `string` | `undefined` | 非受控初始值。 |
| `InputGroupButton variant` | `ButtonVariants["variant"]` | `'ghost'` | 内嵌按钮视觉层级。 |
| `InputGroupButton size` | `'xs' \| 'sm' \| 'icon-xs' \| 'icon-sm'` | `'xs'` | 内嵌按钮尺寸。 |
