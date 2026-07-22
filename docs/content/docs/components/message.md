---
title: Message 会话消息
description: 用于会话消息场景的 MoriUI 组件。
---

# Message 会话消息

用于会话消息场景的 MoriUI 组件。

## 导入

```ts
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from 'moriui'
```

## 示例

### 概览

展示聊天消息结构。

::component-preview{name="message-demo"}
::

### 头像

消息发送者头像。

::component-preview{name="message-avatar"}
::

### 消息组

连续消息分组排列。

::component-preview{name="message-group"}
::

### 头部与底部

消息的头部和底部信息。

::component-preview{name="message-header-footer"}
::

### 操作

消息上的交互操作。

::component-preview{name="message-actions"}
::

### 附件

消息中的文件附件。

::component-preview{name="message-attachment"}
::

### Markdown

渲染 Markdown 内容。

::component-preview{name="message-markdown"}
::

## 使用说明

### 组合方式

Message 组合 Header、Avatar、Content 与 Footer 组成完整聊天消息；MessageGroup 组织连续消息。

### 对齐

通过 align 控制消息在流中的位置（start/end）。

### RTL

消息内容沿 dir 排列。

## 变体

Message 的 variant 支持 default/secondary/tinted，align 支持 start/end。

## 可访问性

消息列表应由页面提供 log/list 等上下文。消息时间戳和发送者信息应可被辅助技术理解。可交互的消息元素应使用 button 或 a。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Message variant` | `'default' \| 'secondary' \| 'tinted'` | `'default'` | 消息视觉层级。 |
| `Message align` | `'start' \| 'end'` | `'start'` | 消息对齐方向。 |
| `MessageHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到消息头部的调用方类。 |
| `MessageAvatar class` | `HTMLAttributes["class"]` | `undefined` | 合并到头像区域的调用方类。 |
| `MessageContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到消息内容的调用方类。 |
| `MessageFooter class` | `HTMLAttributes["class"]` | `undefined` | 合并到消息底部的调用方类。 |
| `MessageGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到消息分组的调用方类。 |
