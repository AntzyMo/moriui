---
title: Avatar 用户头像
description: 用于用户头像场景的 MoriUI 组件。
---

# Avatar 用户头像

用于用户头像场景的 MoriUI 组件。

## 导入

```ts
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from 'moriui'
```

## 示例

### 概览

头像以可辨识的回退文字保持稳定占位。

::component-preview{name="avatar-demo"}
::

### 基础

使用 AvatarFallback 提供图片不可用时的内容。

::component-preview{name="avatar-basic"}
::

### 状态徽标

AvatarBadge 在头像边缘表达在线状态。

::component-preview{name="avatar-badge"}
::

### 图标徽标

用可访问名称补充仅图标徽标的含义。

::component-preview{name="avatar-badge-icon"}
::

### 头像组

AvatarGroup 紧凑排列多位成员。

::component-preview{name="avatar-group"}
::

### 剩余数量

AvatarGroupCount 汇总未展示成员。

::component-preview{name="avatar-group-count"}
::

### 图标计数

使用图标入口指向完整成员列表。

::component-preview{name="avatar-group-count-icon"}
::

### 尺寸

sm、default 与 lg 覆盖常见密度。

::component-preview{name="avatar-size"}
::

### 账户入口

头像可放入语义正确的按钮作为菜单入口。

::component-preview{name="avatar-dropdown"}
::

### RTL

在 RTL 文本流中组合头像和名称。

::component-preview{name="avatar-rtl"}
::

## 使用说明

### 组合方式

Avatar 组合 AvatarImage 与 AvatarFallback；徽标和分组按需加入，图片失败时由 Reka UI 切换回退内容。

### RTL

头像内容与分组顺序继承外围 dir；文本标签在 RTL 环境保持正确阅读方向。

## 变体

Avatar 的 size 支持 sm、default、lg；其他子组件继承根组件尺寸 Token。

## 可访问性

AvatarImage 需要可理解的 alt；纯装饰头像可使用空 alt。仅颜色表达的 AvatarBadge 必须配合屏幕阅读器文本或 aria-label。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Avatar size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 头像尺寸。 |
| `AvatarImage src` | `string` | `—` | 必填图片地址；加载状态由 Reka UI 管理。 |
| `AvatarImage loadingStatusChange` | `'idle' \| 'loading' \| 'loaded' \| 'error'` | `—` | 图片加载状态变化事件。 |
| `AvatarFallback delayMs` | `number` | `undefined` | 延迟显示回退内容的毫秒数。 |
| `AvatarBadge class` | `HTMLAttributes["class"]` | `undefined` | 合并到状态徽标上的调用方类。 |
| `AvatarGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到头像分组上的调用方类。 |
| `AvatarGroupCount class` | `HTMLAttributes["class"]` | `undefined` | 合并到剩余数量标记上的调用方类。 |
| `Avatar as / asChild` | `string \| Component / boolean` | `'span' / false` | 来自 Reka Primitive 的元素组合能力。 |
