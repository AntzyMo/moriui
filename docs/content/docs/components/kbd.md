---
title: Kbd 键盘快捷键
description: 键盘快捷键展示组件。
group: 基础
related:
  - button
  - tooltip
---

## 引入

```vue
import { Kbd, KbdGroup } from 'moriui'
```

## 示例

### 概览

::component-preview{name="kbd-demo"}
在说明文字中展示快捷键。
::

### 组合键

::component-preview{name="kbd-group"}
多个按键组成快捷键序列。
::

### 按钮

::component-preview{name="kbd-button"}
按钮同时提示键盘操作。
::

### 提示

::component-preview{name="kbd-tooltip"}
Tooltip 补充低频快捷键。
::

### 输入组合

::component-preview{name="kbd-input-group"}
搜索输入展示唤起快捷键。
::

### RTL

::component-preview{name="kbd-rtl"}
快捷键与 RTL 说明文字组合。
::

Kbd 表示单个按键，KbdGroup 将多个按键与分隔符作为一个快捷键序列排列。快捷键字符本身保持原顺序；外围说明文字可继承 RTL 方向。

Kbd 与 KbdGroup 没有公开视觉变体，保持统一紧凑键帽样式。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Kbd class` | `HTMLAttributes["class"]` | `undefined` | 合并到单个键帽稳定样式上的调用方类 |
| `KbdGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到快捷键序列稳定样式上的调用方类 |

## 无障碍

Kbd 只呈现按键提示，不提供交互行为。快捷键必须有等价的可见操作；使用平台符号时应结合上下文确保用户能够理解。
