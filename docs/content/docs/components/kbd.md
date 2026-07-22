---
title: Kbd 键盘快捷键
description: 用于键盘快捷键场景的 MoriUI 组件。
---

# Kbd 键盘快捷键

用于键盘快捷键场景的 MoriUI 组件。

## 导入

```ts
import { Kbd, KbdGroup } from 'moriui'
```

## 示例

### 概览

在说明文字中展示快捷键。

::component-preview{name="kbd-demo"}
::

### 组合键

多个按键组成快捷键序列。

::component-preview{name="kbd-group"}
::

### 按钮

按钮同时提示键盘操作。

::component-preview{name="kbd-button"}
::

### 提示

Tooltip 补充低频快捷键。

::component-preview{name="kbd-tooltip"}
::

### 输入组合

搜索输入展示唤起快捷键。

::component-preview{name="kbd-input-group"}
::

### RTL

快捷键与 RTL 说明文字组合。

::component-preview{name="kbd-rtl"}
::

## 使用说明

### 组合方式

Kbd 表示单个按键，KbdGroup 将多个按键与分隔符作为一个快捷键序列排列。

### RTL

快捷键字符本身保持原顺序；外围说明文字可继承 RTL 方向。

## 变体

Kbd 与 KbdGroup 没有公开视觉变体，保持统一紧凑键帽样式。

## 可访问性

Kbd 只呈现按键提示，不提供交互行为。快捷键必须有等价的可见操作；使用平台符号时应结合上下文确保用户能够理解。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Kbd class` | `HTMLAttributes["class"]` | `undefined` | 合并到单个键帽稳定样式上的调用方类。 |
| `KbdGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到快捷键序列稳定样式上的调用方类。 |
