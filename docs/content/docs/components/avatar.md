---
title: Avatar 用户头像
description: 展示用户身份的头像组件。
group: 基础
related:
  - badge
  - item
---

## 引入

```vue
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from 'moriui'
```

## 示例

### 概览

::component-preview{name="avatar-demo"}
头像以可辨识的回退文字保持稳定占位。
::

### 基础

::component-preview{name="avatar-basic"}
使用 AvatarFallback 提供图片不可用时的内容。
::

### 状态徽标

::component-preview{name="avatar-badge"}
AvatarBadge 在头像边缘表达在线状态。
::

### 图标徽标

::component-preview{name="avatar-badge-icon"}
用可访问名称补充仅图标徽标的含义。
::

### 头像组

::component-preview{name="avatar-group"}
AvatarGroup 紧凑排列多位成员。
::

### 剩余数量

::component-preview{name="avatar-group-count"}
AvatarGroupCount 汇总未展示成员。
::

### 图标计数

::component-preview{name="avatar-group-count-icon"}
使用图标入口指向完整成员列表。
::

### 尺寸

::component-preview{name="avatar-size"}
sm、default 与 lg 覆盖常见密度。
::

### 账户入口

::component-preview{name="avatar-dropdown"}
头像可放入语义正确的按钮作为菜单入口。
::

### RTL

::component-preview{name="avatar-rtl"}
在 RTL 文本流中组合头像和名称。
::

Avatar 组合 AvatarImage 与 AvatarFallback；徽标和分组按需加入，图片失败时由 Reka UI 切换回退内容。头像内容与分组顺序继承外围 dir；文本标签在 RTL 环境保持正确阅读方向。

Avatar 的 size 支持 sm、default、lg；其他子组件继承根组件尺寸 Token。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Avatar size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 头像尺寸 |
| `AvatarImage src` | `string` | `—` | 必填图片地址；加载状态由 Reka UI 管理 |
| `AvatarImage loadingStatusChange` | `'idle' \| 'loading' \| 'loaded' \| 'error'` | `—` | 图片加载状态变化事件 |
| `AvatarFallback delayMs` | `number` | `undefined` | 延迟显示回退内容的毫秒数 |
| `AvatarBadge class` | `HTMLAttributes["class"]` | `undefined` | 合并到状态徽标上的调用方类 |
| `AvatarGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到头像分组上的调用方类 |
| `AvatarGroupCount class` | `HTMLAttributes["class"]` | `undefined` | 合并到剩余数量标记上的调用方类 |
| `Avatar as / asChild` | `string \| Component / boolean` | `'span' / false` | 来自 Reka Primitive 的元素组合能力 |

## 无障碍

AvatarImage 需要可理解的 alt；纯装饰头像可使用空 alt。仅颜色表达的 AvatarBadge 必须配合屏幕阅读器文本或 aria-label。
