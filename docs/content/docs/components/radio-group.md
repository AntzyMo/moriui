---
title: Radio Group 单项选择
description: 单选项选择组组件。
group: 表单
related: []
---

## 引入

```vue
import { RadioGroup, RadioGroupItem } from 'moriui'
```

## 示例

### 概览

::component-preview{name="radio-group-demo"}
用 v-model 在三个界面密度中保持唯一选择。
::

### 说明

::component-preview{name="radio-group-description"}
FieldContent 为每个选项组合标签与帮助文字。
::

### 选择卡片

::component-preview{name="radio-group-choice-card"}
FieldLabel 包裹整行内容，扩大可点击区域。
::

### 字段集

::component-preview{name="radio-group-fieldset"}
FieldSet 与 FieldLegend 建立订阅方案的语义分组。
::

### 禁用

::component-preview{name="radio-group-disabled"}
单个 disabled 项与可选项共存。
::

### 无效

::component-preview{name="radio-group-invalid"}
aria-invalid 与 Field data-invalid 同步错误状态。
::

### RTL

::component-preview{name="radio-group-rtl"}
阿拉伯语选项使用 RTL 方向与正确的键盘顺序。
::

RadioGroup 管理唯一选中值，RadioGroupItem 以必填 value 标识选项；标签、说明与错误由 Field 组合。使用 v-model 持有当前 AcceptableValue；无需受控时可用 defaultValue 设置初始选择。disabled 可设置在整组或单个 Item；无效项使用 aria-invalid，外围 Field 使用 data-invalid。dir 影响方向键顺序与内容阅读方向，Reka UI 负责 roving focus 和循环导航。

RadioGroup 没有公开视觉或尺寸变体；选中、未选、disabled、invalid 与 orientation 状态由 Reka UI 属性驱动。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `RadioGroup v-model` | `AcceptableValue` | `undefined` | 当前唯一选中值 |
| `RadioGroup defaultValue` | `AcceptableValue` | `undefined` | 非受控初始选中值 |
| `RadioGroup disabled / required` | `boolean` | `false` | 整组禁用与表单必填语义 |
| `RadioGroup orientation` | `'horizontal' \| 'vertical'` | `undefined` | 方向键导航方向 |
| `RadioGroup dir / loop` | `'ltr' \| 'rtl' / boolean` | 继承 / true | 阅读方向与循环键盘导航 |
| `RadioGroupItem value` | `AcceptableValue` | `—` | 必填的选项值 |
| `RadioGroupItem disabled` | `boolean` | `false` | 单独禁用当前选项 |

## 无障碍

RadioGroup 复用 Reka UI 的 radiogroup/radio ARIA、方向键、Space 选择与 roving focus。整组应有 FieldLegend 或 aria-label，每个 Item 必须关联可读标签；错误同时使用 aria-invalid 与文字说明。
