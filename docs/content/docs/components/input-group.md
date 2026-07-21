---
title: Input Group 输入组合
description: 在输入框前后附加内容或操作的容器。
group: 表单
related:
  - input
---

## 引入

```vue
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from 'moriui'
```

## 示例

### 概览

::component-preview{name="input-group-demo"}
搜索图标、输入和结果数量共享边界。
::

### 行内起始

::component-preview{name="input-group-inline-start"}
图标位于逻辑起始侧。
::

### 行内结束

::component-preview{name="input-group-inline-end"}
操作位于逻辑结束侧。
::

### 块级起始

::component-preview{name="input-group-block-start"}
标题附加内容位于控件上方。
::

### 块级结束

::component-preview{name="input-group-block-end"}
辅助内容位于控件下方。
::

### 图标

::component-preview{name="input-group-icon"}
组合起始与结束图标。
::

### 文字

::component-preview{name="input-group-text"}
货币、协议和单位作为附加文字。
::

### 按钮

::component-preview{name="input-group-button"}
复制、收藏等操作位于输入边界内。
::

### 快捷键

::component-preview{name="input-group-kbd"}
Kbd 提示全局搜索快捷键。
::

### 菜单入口

::component-preview{name="input-group-dropdown"}
紧凑按钮提供更多选择入口。
::

### 加载状态

::component-preview{name="input-group-spinner"}
Spinner 与状态文字表达进行中任务。
::

### 多行输入

::component-preview{name="input-group-textarea"}
MoriUI Textarea 与块级 Addon 组成多行编辑器。
::

### 自定义控件

::component-preview{name="input-group-custom"}
自定义自动增高 textarea 保持统一焦点处理。
::

### RTL

::component-preview{name="input-group-rtl"}
逻辑对齐在 RTL 中保持自然顺序。
::

InputGroup 组合 InputGroupInput、Addon、Button 与 Text；MoriUI 当前不导出 InputGroupTextarea。Addon align 支持 inline-start、inline-end、block-start 与 block-end；DOM 中应放在控件之后，以保持焦点导航。MoriUI Textarea 等控件可作为 InputGroup 的自定义控制区，并与块级附加内容共同布局。inline-start 和 inline-end 是逻辑方向，在 RTL 中自然翻转。

InputGroupAddon align 支持 inline-start/inline-end/block-start/block-end；InputGroupButton size 支持 xs/sm/icon-xs/icon-sm，variant 复用 Button。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `InputGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到 role="group" 根容器 |
| `InputGroupAddon align` | `'inline-start' \| 'inline-end' \| 'block-start' \| 'block-end'` | `'inline-start'` | 附加内容的逻辑位置 |
| `InputGroupInput v-model` | `string` | `''` | 输入组合中的受控字符串值 |
| `InputGroupInput defaultValue` | `string` | `undefined` | 非受控初始值 |
| `InputGroupButton variant` | `ButtonVariants["variant"]` | `'ghost'` | 内嵌按钮视觉层级 |
| `InputGroupButton size` | `'xs' \| 'sm' \| 'icon-xs' \| 'icon-sm'` | `'xs'` | 内嵌按钮尺寸 |

## 无障碍

InputGroup 不替代输入标签，仍需 FieldLabel 或 aria-label。Addon 应在 DOM 中位于控件之后；点击非交互附加内容会聚焦 data-slot="input-group-control"，按钮、链接等交互元素保持独立焦点。
