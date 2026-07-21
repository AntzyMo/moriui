---
title: Switch 状态开关
description: 开启或关闭状态的切换控件。
group: 表单
related: []
---

## 引入

```vue
import { Switch } from 'moriui'
```

## 示例

### 概览

::component-preview{name="switch-demo"}
开关与标签通过 id/for 关联。
::

### 说明

::component-preview{name="switch-description"}
横向 Field 对齐说明文字与状态开关。
::

### 选择卡片

::component-preview{name="switch-choice-card"}
整行标签提供更大的可点击区域。
::

### 禁用

::component-preview{name="switch-disabled"}
disabled 阻止切换并同步 Field 视觉。
::

### 无效

::component-preview{name="switch-invalid"}
aria-invalid 与文字说明表达必选要求。
::

### 尺寸

::component-preview{name="switch-sizes"}
sm 与 default 适配不同密度。
::

### RTL

::component-preview{name="switch-rtl"}
阿拉伯语标签在 RTL 横向布局中工作。
::

Switch 使用 v-model 持有 boolean 或自定义 trueValue/falseValue，checked/unchecked 状态由 Reka UI 输出。FieldContent 组合标签和说明；FieldLabel 可包裹整行以扩大开关的可点击区域。disabled 阻止切换；aria-invalid 与外围 Field 的 data-invalid 同步校验状态。size 支持 sm 与 default，两者保持相同的键盘和表单行为。开关状态不依赖书写方向，标签与说明沿 Field 的 dir 排列。

Switch 的 size 支持 sm/default；checked、unchecked、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Switch v-model` | `T \| null` | `falseValue` | 当前开关值 |
| `Switch defaultValue` | `T` | `falseValue` | 非受控初始值 |
| `Switch trueValue / falseValue` | `T` | `true / false` | 开启与关闭状态对应的模型值 |
| `Switch size` | `'sm' \| 'default'` | `'default'` | 开关尺寸 |
| `Switch disabled / required` | `boolean` | `false` | 禁用交互与表单必填语义 |
| `Switch name / value` | `string` | `undefined / 'on'` | 隐藏表单控件的名称与提交值 |
| `Switch as / asChild` | `string \| Component / boolean` | `'button' / false` | 元素组合能力；默认保留 button 与 switch 语义 |

## 无障碍

Switch 复用 Reka UI 的 role="switch"、aria-checked、Space/Enter 切换与隐藏表单输入。必须关联 FieldLabel/Label 或提供 aria-label；禁用使用 disabled，无效使用 aria-invalid 和可读说明。
