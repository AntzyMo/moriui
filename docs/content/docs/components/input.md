---
title: Input 单行输入
description: 用于单行输入场景的 MoriUI 组件。
---

# Input 单行输入

用于单行输入场景的 MoriUI 组件。

## 导入

```ts
import { Input } from 'moriui'
```

## 示例

### 概览

密码输入、标签和安全说明。

::component-preview{name="input-demo"}
::

### 基础

使用 v-model 同步字符串。

::component-preview{name="input-basic"}
::

### 字段

Field 提供标签与说明。

::component-preview{name="input-field"}
::

### 字段组

多个 Field 组成表单。

::component-preview{name="input-fieldgroup"}
::

### 禁用

disabled 保留原生不可交互语义。

::component-preview{name="input-disabled"}
::

### 无效

aria-invalid 与 FieldError 同步错误。

::component-preview{name="input-invalid"}
::

### 文件

type="file" 使用浏览器文件选择能力。

::component-preview{name="input-file"}
::

### 行内

横向 Field 组合搜索输入与按钮。

::component-preview{name="input-inline"}
::

### 网格

并排组织姓名输入。

::component-preview{name="input-grid"}
::

### 必填

required 与可见标记共同说明要求。

::component-preview{name="input-required"}
::

### 徽记

标签内用 Badge 补充推荐信息。

::component-preview{name="input-badge"}
::

### 输入组合

前缀、输入与图标共享输入边界。

::component-preview{name="input-input-group"}
::

### 按钮组合

Input 与提交按钮相邻排列。

::component-preview{name="input-button-group"}
::

### 表单

多个受控输入组成完整表单。

::component-preview{name="input-form"}
::

### RTL

阿拉伯语标签、说明与输入方向。

::component-preview{name="input-rtl"}
::

## 使用说明

### 基础输入

Input 渲染原生 input，并通过 v-model 同步字符串值。

### 禁用状态

disabled 保留原生禁用语义；外围 Field 可使用 data-disabled 同步标签视觉。

### 无效状态

aria-invalid="true" 同时向辅助技术和 MoriUI 样式表达校验错误。

### 必填状态

required 保留原生必填校验语义，并应配合可见的必填提示。

### RTL

输入内容、标签与占位符可继承或显式设置 dir。

## 变体

Input 保持单一 Nova 视觉基线；通过原生属性、Field、InputGroup 与 ButtonGroup 组合具体场景。

## 可访问性

Input 输出原生 input。调用方必须使用 Label/FieldLabel 或 aria-label 提供名称；错误使用 aria-invalid 和 FieldError，必填使用 required，文件输入保留浏览器原生选择与键盘行为。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `string` | `''` | 当前输入值。 |
| `defaultValue` | `string` | `undefined` | 未提供 v-model 时的初始值。 |
| `原生 input 属性` | `InputHTMLAttributes` | `—` | type、disabled、required、placeholder、aria-invalid 等自动透传到原生 input。 |
| `class` | `HTMLAttributes["class"]` | `undefined` | 合并到输入框变体类。 |
