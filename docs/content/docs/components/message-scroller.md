---
title: Message Scroller 消息滚动区
description: 用于消息滚动区场景的 MoriUI 组件。
---

# Message Scroller 消息滚动区

用于消息滚动区场景的 MoriUI 组件。

## 导入

```ts
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility } from 'moriui'
```

## 示例

### 概览

标准消息滚动容器。

::component-preview{name="message-scroller-demo"}
::

### 可滚动

长消息列表滚动。

::component-preview{name="message-scroller-scrollable"}
::

### 锚定

新消息自动滚动对齐。

::component-preview{name="message-scroller-anchoring"}
::

### 流式

渐进追加流式消息。

::component-preview{name="message-scroller-streaming"}
::

### 加载历史

回溯加载旧消息。

::component-preview{name="message-scroller-load-history"}
::

### 可见性

检测消息进入视口。

::component-preview{name="message-scroller-visibility"}
::

## 使用说明

### 组合方式

MessageScroller 由 Provider、Viewport、Content、Item 和 Button 组成，支持滚动定位、锚定与可见性检测。

### 滚动定位

scrollAlign 控制新消息的滚动对齐方式。

### 流式追加

支持渐进式插入新消息，保持滚动位置稳定。

### 加载历史

回溯加载历史消息，不改变当前视口位置。

## 变体

MessageScroller 的 scrollAlign 支持 start/end；defaultScrollPosition 支持 top/bottom。

## 可访问性

MessageScroller 管理动态内容区域的滚动和焦点。新消息应有适当的 aria-live 区域通知。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `MessageScrollerProvider class` | `HTMLAttributes["class"]` | `undefined` | 合并到滚动器容器的调用方类。 |
| `MessageScrollerViewport class` | `HTMLAttributes["class"]` | `undefined` | 合并到视口的调用方类。 |
| `MessageScrollerContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到内容容器的调用方类。 |
| `MessageScrollerItem class` | `HTMLAttributes["class"]` | `undefined` | 合并到每条消息项的调用方类。 |
| `MessageScrollerButton direction` | `'top' \| 'bottom'` | `'bottom'` | 滚动按钮的指向方向。 |
| `useMessageScroller()` | `MessageScrollerScrollable` | `—` | 获取滚动器实例进行编程控制。 |
| `useMessageScrollerScrollable()` | `ComputedRef<boolean>` | `—` | 检测内容是否可滚动。 |
| `useMessageScrollerVisibility()` | `MessageScrollerVisibilityState` | `—` | 监听元素的视口可见性。 |
