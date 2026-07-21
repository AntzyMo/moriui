---
title: Label 字段说明标签
description: 关联表单控件的说明标签。
group: 表单
related:
  - input
---

## 引入

```vue
import { Label } from 'moriui'
```

## 示例

### 概览

::component-preview{name="label-demo"}
Label 与 Checkbox 通过 for/id 建立关联。
::

### RTL

::component-preview{name="label-rtl"}
阿拉伯语标签继承 RTL 方向。
::

完整字段优先使用 FieldLabel、FieldDescription 与 FieldError；独立场景直接使用 Label。Label 继承外围 dir，并通过 for 关联方向无关的控件 id。

Label 没有公开视觉变体；调用方 class 与 Reka LabelProps 完整透传。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `for` | `string` | `undefined` | 关联表单控件的 id |
| `as / asChild` | `string \| Component / boolean` | `'label' / false` | 来自 Reka Label 的元素组合能力 |
| `class` | `HTMLAttributes["class"]` | `undefined` | 合并到标签基础样式 |

## 无障碍

Label 复用 Reka UI 的 label 行为。for 必须指向唯一控件 id，点击标签即可聚焦或切换控件；不要用无语义文本替代标签，复杂表单优先组合 FieldLabel。
