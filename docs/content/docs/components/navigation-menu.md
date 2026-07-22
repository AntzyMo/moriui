---
title: Navigation Menu 站点导航
description: 用于站点导航场景的 MoriUI 组件。
---

# Navigation Menu 站点导航

用于站点导航场景的 MoriUI 组件。

## 导入

```ts
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuSub, NavigationMenuTrigger, NavigationMenuViewport } from 'moriui'
```

## 示例

### 概览

站点主导航菜单。

::component-preview{name="navigation-menu-demo"}
::

### RTL

从右到左的导航菜单。

::component-preview{name="navigation-menu-rtl"}
::

## 使用说明

### 组合方式

NavigationMenu 由 List、Item、Trigger 和 Content 组成，Viewport 管理弹出内容的定位。

### RTL

方向由 DirectionProvider 控制。

## 变体

NavigationMenu 没有视觉变体；viewport 定位由 Reka UI NavigationMenu 管理。

## 可访问性

NavigationMenu 复用 Reka UI 的 navigation/menubar ARIA 和键盘导航。Root 元素默认输出 role="navigation"；Trigger 和 Content 自动关联。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `NavigationMenu v-model:modelValue` | `string` | `undefined` | 当前激活菜单项的值。 |
| `NavigationMenu defaultValue` | `string` | `undefined` | 非受控初始激活项。 |
| `NavigationMenu delayDuration` | `number` | `200` | 延迟打开/关闭的毫秒数。 |
| `NavigationMenuList class` | `HTMLAttributes["class"]` | `undefined` | 合并到列表的调用方类。 |
| `NavigationMenuTrigger disabled` | `boolean` | `false` | 禁用触发器。 |
| `NavigationMenuLink as / asChild` | `string \| Component / boolean` | `'a' / false` | 链接的元素组合能力。 |
| `NavigationMenuLink active` | `boolean` | `false` | 标记当前激活的导航链接。 |
| `NavigationMenuViewport class` | `HTMLAttributes["class"]` | `undefined` | 合并到视口容器的调用方类。 |
