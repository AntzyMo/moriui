---
title: Spinner 忙碌动画
description: 用于忙碌动画场景的 MoriUI 组件。
---

# Spinner 忙碌动画

用于忙碌动画场景的 MoriUI 组件。

## 导入

```ts
import { Spinner } from 'moriui'
```

## 示例

### 概览

基础旋转加载图标。

::component-preview{name="spinner-demo"}
::

### 尺寸

四种不同尺寸。

::component-preview{name="spinner-size"}
::

### 按钮

按钮内的加载状态。

::component-preview{name="spinner-button"}
::

### 徽记

徽记内的加载状态。

::component-preview{name="spinner-badge"}
::

### 输入组合

输入框旁的加载状态。

::component-preview{name="spinner-input-group"}
::

### RTL

旋转图标在 RTL 页面中。

::component-preview{name="spinner-rtl"}
::

## 使用说明

### 尺寸

size 支持 xs、sm、default、lg，通过 CSS 变量控制旋转图标的大小。

### RTL

Spinner 的旋转方向与书写方向无关。

## 变体

Spinner 的 size 支持 xs、sm、default、lg。

## 可访问性

Spinner 默认输出 role="status" 和 aria-label="Loading"。在按钮等具有自身语义的容器中使用时，应确保容器提供适当的加载状态描述。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Spinner size` | `'xs' \| 'sm' \| 'default' \| 'lg'` | `'default'` | 旋转图标的尺寸。 |
| `Spinner class` | `HTMLAttributes["class"]` | `undefined` | 合并到旋转图标容器的调用方类。 |
