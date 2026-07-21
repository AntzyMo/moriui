---
title: Input 单行输入
description: 单行文本输入框。
group: 表单
related:
  - input-group
  - label
---

## 引入

```vue
import { Input } from 'moriui'
```

## 示例

### 概览

::component-preview{name="input-demo"}
密码输入、标签和安全说明。
::

### 基础

::component-preview{name="input-basic"}
使用 v-model 同步字符串。
::

### 字段

::component-preview{name="input-field"}
Field 提供标签与说明。
::

### 字段组

::component-preview{name="input-fieldgroup"}
多个 Field 组成表单。
::

### 禁用

::component-preview{name="input-disabled"}
disabled 保留原生不可交互语义。
::

### 无效

::component-preview{name="input-invalid"}
aria-invalid 与 FieldError 同步错误。
::

### 文件

::component-preview{name="input-file"}
type="file" 使用浏览器文件选择能力。
::

### 行内

::component-preview{name="input-inline"}
横向 Field 组合搜索输入与按钮。
::

### 网格

::component-preview{name="input-grid"}
并排组织姓名输入。
::

### 必填

::component-preview{name="input-required"}
required 与可见标记共同说明要求。
::

### 徽记

::component-preview{name="input-badge"}
标签内用 Badge 补充推荐信息。
::

### 输入组合

::component-preview{name="input-input-group"}
前缀、输入与图标共享输入边界。
::

### 按钮组合

::component-preview{name="input-button-group"}
Input 与提交按钮相邻排列。
::

### 表单

::component-preview{name="input-form"}
多个受控输入组成完整表单。
::

### RTL

::component-preview{name="input-rtl"}
阿拉伯语标签、说明与输入方向。
::

Input 渲染原生 input，并通过 v-model 同步字符串值。disabled 保留原生禁用语义；外围 Field 可使用 data-disabled 同步标签视觉。aria-invalid="true" 同时向辅助技术和 MoriUI 样式表达校验错误。required 保留原生必填校验语义，并应配合可见的必填提示。输入内容、标签与占位符可继承或显式设置 dir。

Input 保持单一 Nova 视觉基线；通过原生属性、Field、InputGroup 与 ButtonGroup 组合具体场景。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `v-model` | `string` | `''` | 当前输入值 |
| `defaultValue` | `string` | `undefined` | 未提供 v-model 时的初始值 |
| 原生 input 属性 | `InputHTMLAttributes` | `—` | type、disabled、required、placeholder、aria-invalid 等自动透传到原生 input |
| `class` | `HTMLAttributes["class"]` | `undefined` | 合并到输入框变体类 |

## 无障碍

Input 输出原生 input。调用方必须使用 Label/FieldLabel 或 aria-label 提供名称；错误使用 aria-invalid 和 FieldError，必填使用 required，文件输入保留浏览器原生选择与键盘行为。
