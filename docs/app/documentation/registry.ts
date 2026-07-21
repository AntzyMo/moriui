import type { Component } from 'vue'

import { defineAsyncComponent } from 'vue'
import { baseSlugs, componentInventory } from './inventory'

export type ComponentGroup = '基础' | '表单' | '导航' | '浮层' | '数据与反馈'
export type ComponentStatus = 'published' | 'coming-soon'

export interface ExampleDefinition {
  id: string
  title: string
  description: string
  shadcnDoc: string
  shadcnExample: string
  code: string
  preview: Component
}

export interface StateSectionDefinition {
  id: string
  title: string
  description: string
  shadcnHeading: string
}

export interface ApiDefinition {
  name: string
  type: string
  defaultValue: string
  description: string
}

export interface AccessibilityDefinition {
  description: string
}

export interface ReferenceDefinition {
  importCode: string
  resources: readonly { label: string, href: string }[]
  states: readonly StateSectionDefinition[]
  examples: readonly ExampleDefinition[]
  variants: string
  api: readonly ApiDefinition[]
  accessibility: AccessibilityDefinition
}

export interface ComponentRecord {
  slug: string
  name: string
  title: string
  group: ComponentGroup
  status: ComponentStatus
  catalogPreview: Component
  summary: string
  related: readonly string[]
  reference?: ReferenceDefinition
}

export type PublishedComponentRecord = ComponentRecord & { reference: ReferenceDefinition }

export interface ComponentGroupDefinition {
  title: ComponentGroup
  items: readonly ComponentRecord[]
}

interface VueModule { default: Component }

const exampleLoaders = import.meta.glob<VueModule>('../components/examples/*/*.vue')
const exampleSources = import.meta.glob('../components/examples/*/*.vue', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as Record<string, string>

function loadExample(slug: string, name: string) {
  const path = `../components/examples/${slug}/${name}.vue`
  const loader = exampleLoaders[path]
  if (!loader)
    throw new Error(`[MoriUI 文档] 找不到示例组件：${path}`)
  return defineAsyncComponent(async () => (await loader()).default)
}

function defineExample(
  slug: string,
  name: string,
  title: string,
  description: string
): ExampleDefinition {
  const path = `../components/examples/${slug}/${name}.vue`
  const code = exampleSources[path]
  if (!code?.trim())
    throw new Error(`[MoriUI 文档] 找不到示例源码：${path}`)
  return {
    id: name,
    title,
    description,
    shadcnDoc: `ui/apps/v4/content/docs/components/base/${slug}.mdx`,
    shadcnExample: name,
    code,
    preview: loadExample(slug, name)
  }
}

function defineCatalog(slug: string) {
  return loadExample(slug, 'catalog')
}

const CatalogPlaceholder = defineAsyncComponent(() => import('../components/CatalogPlaceholder.vue'))

function componentResources(slug: string) {
  return [
    { label: '组件源码', href: `https://github.com/AntzyMo/moriui/tree/main/packages/core/src/components/${slug}` },
    { label: '问题反馈', href: 'https://github.com/AntzyMo/moriui/issues' }
  ]
}

const baseReferences: Record<string, ReferenceDefinition> = {
  'aspect-ratio': {
    importCode: 'import { AspectRatio } from \'moriui\'',
    resources: componentResources('aspect-ratio'),
    states: [{ id: 'RTL', title: 'RTL', description: '比例计算与文字方向无关；在 RTL 容器中，内部内容继续继承正确的 dir 语义。', shadcnHeading: 'RTL' }],
    examples: [
      defineExample('aspect-ratio', 'aspect-ratio-demo', '概览', '以 16:9 比例展示常见横向媒体。'),
      defineExample('aspect-ratio', 'aspect-ratio-square', '方形', 'ratio=1 创建稳定的正方形区域。'),
      defineExample('aspect-ratio', 'aspect-ratio-portrait', '竖向', 'ratio=9/16 适合竖向封面。'),
      defineExample('aspect-ratio', 'aspect-ratio-rtl', 'RTL', '比例容器可安全放入 RTL 页面。')
    ],
    variants: 'AspectRatio 没有视觉变体；通过 ratio 定义宽高比，并由内容决定表面样式。',
    api: [
      { name: 'AspectRatio ratio', type: 'number', defaultValue: '1', description: '目标宽高比，例如 16 / 9。' },
      { name: 'AspectRatio as', type: 'string | Component', defaultValue: '\'div\'', description: '内部承载内容的元素或组件。' },
      { name: 'AspectRatio asChild', type: 'boolean', defaultValue: 'false', description: '将内部原语行为合并到唯一子元素。' }
    ],
    accessibility: { description: '比例容器只负责布局，不改变内容语义。媒体仍需提供 alt，纯装饰内容应使用空 alt 或合适的隐藏方式。' }
  },
  'avatar': {
    importCode: 'import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from \'moriui\'',
    resources: componentResources('avatar'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Avatar 组合 AvatarImage 与 AvatarFallback；徽标和分组按需加入，图片失败时由 Reka UI 切换回退内容。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: '头像内容与分组顺序继承外围 dir；文本标签在 RTL 环境保持正确阅读方向。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('avatar', 'avatar-demo', '概览', '头像以可辨识的回退文字保持稳定占位。'),
      defineExample('avatar', 'avatar-basic', '基础', '使用 AvatarFallback 提供图片不可用时的内容。'),
      defineExample('avatar', 'avatar-badge', '状态徽标', 'AvatarBadge 在头像边缘表达在线状态。'),
      defineExample('avatar', 'avatar-badge-icon', '图标徽标', '用可访问名称补充仅图标徽标的含义。'),
      defineExample('avatar', 'avatar-group', '头像组', 'AvatarGroup 紧凑排列多位成员。'),
      defineExample('avatar', 'avatar-group-count', '剩余数量', 'AvatarGroupCount 汇总未展示成员。'),
      defineExample('avatar', 'avatar-group-count-icon', '图标计数', '使用图标入口指向完整成员列表。'),
      defineExample('avatar', 'avatar-size', '尺寸', 'sm、default 与 lg 覆盖常见密度。'),
      defineExample('avatar', 'avatar-dropdown', '账户入口', '头像可放入语义正确的按钮作为菜单入口。'),
      defineExample('avatar', 'avatar-rtl', 'RTL', '在 RTL 文本流中组合头像和名称。')
    ],
    variants: 'Avatar 的 size 支持 sm、default、lg；其他子组件继承根组件尺寸 Token。',
    api: [
      { name: 'Avatar size', type: '\'sm\' | \'default\' | \'lg\'', defaultValue: '\'default\'', description: '头像尺寸。' },
      { name: 'AvatarImage src', type: 'string', defaultValue: '—', description: '必填图片地址；加载状态由 Reka UI 管理。' },
      { name: 'AvatarImage loadingStatusChange', type: '\'idle\' | \'loading\' | \'loaded\' | \'error\'', defaultValue: '—', description: '图片加载状态变化事件。' },
      { name: 'AvatarFallback delayMs', type: 'number', defaultValue: 'undefined', description: '延迟显示回退内容的毫秒数。' },
      { name: 'AvatarBadge class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到状态徽标上的调用方类。' },
      { name: 'AvatarGroup class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到头像分组上的调用方类。' },
      { name: 'AvatarGroupCount class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到剩余数量标记上的调用方类。' },
      { name: 'Avatar as / asChild', type: 'string | Component / boolean', defaultValue: '\'span\' / false', description: '来自 Reka Primitive 的元素组合能力。' }
    ],
    accessibility: { description: 'AvatarImage 需要可理解的 alt；纯装饰头像可使用空 alt。仅颜色表达的 AvatarBadge 必须配合屏幕阅读器文本或 aria-label。' }
  },
  'badge': {
    importCode: 'import { Badge } from \'moriui\'',
    resources: componentResources('badge'),
    states: [{ id: 'RTL', title: 'RTL', description: '徽记继承外围书写方向，图标与文本顺序会随内容流自然排列。', shadcnHeading: 'RTL' }],
    examples: [
      defineExample('badge', 'badge-demo', '概览', '用紧凑标签表达状态。'),
      defineExample('badge', 'badge-variants', '变体', '不同变体表达信息层级。'),
      defineExample('badge', 'badge-icon', '带图标', '图标与文字共同表达已验证状态。'),
      defineExample('badge', 'badge-spinner', '加载状态', '旋转图标提示同步仍在进行。'),
      defineExample('badge', 'badge-link', '链接', '通过 as 渲染为语义链接。'),
      defineExample('badge', 'badge-colors', '自定义颜色', '调用方 class 可覆盖局部颜色。'),
      defineExample('badge', 'badge-rtl', 'RTL', '在 RTL 页面中保持自然的内容顺序。')
    ],
    variants: 'variant 支持 default、secondary、destructive、outline、ghost 与 link。',
    api: [
      { name: 'Badge variant', type: '\'default\' | \'secondary\' | \'destructive\' | \'outline\' | \'ghost\' | \'link\'', defaultValue: '\'default\'', description: '徽记的视觉层级。' },
      { name: 'Badge as', type: 'string | Component', defaultValue: '\'span\'', description: '渲染元素或组件。' },
      { name: 'Badge asChild', type: 'boolean', defaultValue: 'false', description: '将样式合并到唯一子元素。' }
    ],
    accessibility: { description: 'Badge 默认只是视觉标签；状态更新需要由外围区域提供 role=status 或 aria-live。仅图标徽记必须提供可访问名称，链接变体应渲染为 a。' }
  },
  'bubble': {
    importCode: 'import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from \'moriui\'',
    resources: componentResources('bubble'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Bubble 负责变体与对齐，BubbleContent 承载消息，BubbleReactions 和 BubbleGroup 分别组织回应与连续消息。', shadcnHeading: 'Composition' },
      { id: '特性', title: '特性', description: '当前公开能力包括七种视觉变体、起止对齐以及回应区域的 side/align；不登记 MoriUI 尚未导出的 Popover。', shadcnHeading: 'Features' },
      { id: '回应标签', title: '回应标签', description: '仅图标回应按钮必须使用 aria-label，回应容器应有描述其用途的可访问名称。', shadcnHeading: 'Labeling Reactions' },
      { id: '交互气泡', title: '交互气泡', description: '只有整个气泡确实触发操作时才将 Bubble 渲染为 button 或链接；普通消息保持非交互元素。', shadcnHeading: 'Interactive Bubbles' },
      { id: '不只依赖颜色', title: '不只依赖颜色', description: '错误、发送中等状态应同时提供文字或图标，不能只依赖 variant 颜色。', shadcnHeading: 'Meaning Beyond Color' }
    ],
    examples: [
      defineExample('bubble', 'bubble-demo', '概览', '组合接收与发送消息。'),
      defineExample('bubble', 'bubble-variants', '变体', '展示当前公开视觉变体。'),
      defineExample('bubble', 'bubble-alignment', '对齐', '使用 align 区分会话双方。'),
      defineExample('bubble', 'bubble-group-demo', '消息组', '连续消息由 BubbleGroup 统一排列。'),
      defineExample('bubble', 'bubble-link-button', '链接与按钮', '消息内容可包含语义明确的操作。'),
      defineExample('bubble', 'bubble-reactions', '回应', 'BubbleReactions 组织紧凑操作。'),
      defineExample('bubble', 'bubble-collapsible', '展开更多', '与 Collapsible 组合长消息。'),
      defineExample('bubble', 'bubble-tooltip', '提示', '交互气泡可与 Tooltip 组合。')
    ],
    variants: 'Bubble variant 支持 default、secondary、muted、tinted、outline、ghost、destructive；align 支持 start/end。',
    api: [
      { name: 'Bubble variant', type: '\'default\' | \'secondary\' | \'muted\' | \'tinted\' | \'outline\' | \'ghost\' | \'destructive\'', defaultValue: '\'default\'', description: '消息视觉层级。' },
      { name: 'Bubble align', type: '\'start\' | \'end\'', defaultValue: '\'start\'', description: '消息在会话流中的对齐方向。' },
      { name: 'BubbleContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到消息内容区域的调用方类。' },
      { name: 'BubbleReactions side', type: '\'top\' | \'bottom\'', defaultValue: '\'bottom\'', description: '回应区域相对气泡的位置。' },
      { name: 'BubbleReactions align', type: '\'start\' | \'end\'', defaultValue: '\'end\'', description: '回应区域的水平对齐。' },
      { name: 'BubbleGroup class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到连续消息分组的调用方类。' },
      { name: 'Bubble as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '根、内容、分组与回应均支持 Reka Primitive 组合。' }
    ],
    accessibility: { description: '对话列表应由页面提供 log/list 等上下文；可交互气泡使用 button 或 a，回应按钮提供 aria-label，状态不能只靠颜色表达。' }
  },
  'card': {
    importCode: 'import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from \'moriui\'',
    resources: componentResources('card'),
    states: [
      { id: '组合方式', title: '组合方式', description: '用 Header、Title、Description、Action、Content 与 Footer 形成稳定内容层级。', shadcnHeading: 'Composition' },
      { id: '间距变量', title: '间距变量', description: 'Card 使用公开局部 Token --card-spacing；size 会设置默认值，调用方可按场景覆盖。', shadcnHeading: 'Spacing Variable' },
      { id: 'RTL', title: 'RTL', description: '卡片布局继承 dir，标题、说明和动作在 RTL 文本流中保持正确顺序。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('card', 'card-demo', '概览', '完整卡片结构与操作。'),
      defineExample('card', 'card-small', '小尺寸', 'size=sm 适配紧凑布局。'),
      defineExample('card', 'card-spacing', '自定义间距', '覆盖 --card-spacing 调整密度。'),
      defineExample('card', 'card-edge-to-edge', '边到边内容', '媒体区域可以跨越内容插槽的内边距。'),
      defineExample('card', 'card-image', '图片', '媒体、标题与描述组成内容卡片。'),
      defineExample('card', 'card-rtl', 'RTL', '卡片在 RTL 页面中保持语义结构。')
    ],
    variants: 'Card size 支持 default 与 sm；--card-spacing 是公开的组件局部 Token。',
    api: [
      { name: 'Card size', type: '\'default\' | \'sm\'', defaultValue: '\'default\'', description: '卡片的密度尺寸，并同步设置 data-size。' },
      { name: 'CardHeader class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到卡片页眉的调用方类。' },
      { name: 'CardTitle class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到卡片标题的调用方类。' },
      { name: 'CardDescription class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到卡片说明的调用方类。' },
      { name: 'CardAction class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到页眉操作区的调用方类。' },
      { name: 'CardContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到卡片内容区的调用方类。' },
      { name: 'CardFooter class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到卡片页脚的调用方类。' }
    ],
    accessibility: { description: 'Card 是布局容器，不自动建立 landmark；按内容需要使用 aria-labelledby 或在外围选择 article/section。标题层级应与页面大纲一致。' }
  },
  'direction': {
    importCode: 'import { DirectionProvider, useDirection } from \'moriui\'',
    resources: componentResources('direction'),
    states: [{ id: 'useDirection', title: 'useDirection', description: 'useDirection 读取最近 DirectionProvider 或 Reka 配置中的 ltr/rtl 值，供需要方向感知的组合逻辑使用。', shadcnHeading: 'useDirection' }],
    examples: [defineExample('direction', 'card-rtl', 'RTL 卡片', 'DirectionProvider 为子树提供从右到左的方向上下文。')],
    variants: 'DirectionProvider 没有视觉变体，只提供 ltr 与 rtl 两种方向上下文。',
    api: [
      { name: 'direction', type: '\'ltr\' | \'rtl\'', defaultValue: '\'ltr\'', description: '推荐的子树书写方向属性。' },
      { name: 'dir', type: '\'ltr\' | \'rtl\'', defaultValue: 'undefined', description: 'direction 未传入时使用的兼容属性。' },
      { name: 'useDirection()', type: 'ComputedRef<\'ltr\' | \'rtl\'>', defaultValue: '—', description: '读取当前 Reka 方向上下文。' }
    ],
    accessibility: { description: '方向上下文应与内容语言一致；页面根元素仍应设置正确的 lang 和 dir，避免视觉顺序与屏幕阅读器阅读顺序不一致。' }
  },
  'empty': {
    importCode: 'import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from \'moriui\'',
    resources: componentResources('empty'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Empty 用 Header 组织 Media、Title、Description，并将主要操作放入 Content。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: '空状态继承外部 dir，说明和操作顺序适配 RTL 内容。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('empty', 'empty-demo', '概览', '标准空状态与主要操作。'),
      defineExample('empty', 'empty-outline', '描边', '虚线边界强调可放置区域。'),
      defineExample('empty', 'empty-background', '背景', '弱化背景区分空状态范围。'),
      defineExample('empty', 'empty-avatar', '头像', '使用头像表达成员相关空状态。'),
      defineExample('empty', 'empty-avatar-group', '头像组', '以成员集合说明协作场景。'),
      defineExample('empty', 'empty-input-group', '输入组合', '将下一步搜索操作放在内容区。'),
      defineExample('empty', 'empty-rtl', 'RTL', '空状态支持从右到左内容。')
    ],
    variants: 'Empty 根组件没有视觉变体；EmptyMedia variant 支持 default 与 icon。',
    api: [
      { name: 'Empty class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到空状态根容器的调用方类。' },
      { name: 'EmptyHeader class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到空状态页眉的调用方类。' },
      { name: 'EmptyMedia variant', type: '\'default\' | \'icon\'', defaultValue: '\'default\'', description: '媒体区域是否使用图标表面。' },
      { name: 'EmptyTitle class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到空状态标题的调用方类。' },
      { name: 'EmptyDescription class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到空状态说明的调用方类。' },
      { name: 'EmptyContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到空状态操作区的调用方类。' }
    ],
    accessibility: { description: 'EmptyTitle 应清楚描述当前状态，Description 说明原因或下一步；主要操作使用 Button。异步切换为空状态时，由外围按需提供 aria-live。' }
  },
  'item': {
    importCode: 'import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from \'moriui\'',
    resources: componentResources('item'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Item 通过 Media、Content、Actions、Header、Footer 组合结构；ItemGroup 与 ItemSeparator 组织列表。', shadcnHeading: 'Composition' },
      { id: 'Item 与 Field', title: 'Item 与 Field', description: '展示信息与操作入口使用 Item；表单标签、描述、校验和控件关系应使用 Field。', shadcnHeading: 'Item vs Field' },
      { id: '变体', title: '变体', description: 'variant 支持 default、outline 与 muted，用于区分条目表面层级。', shadcnHeading: 'Variant' },
      { id: '尺寸', title: '尺寸', description: 'size 支持 default、sm 与 xs，并同步调整间距和媒体尺寸。', shadcnHeading: 'Size' },
      { id: 'RTL', title: 'RTL', description: '条目继承 dir，媒体、内容和操作按逻辑方向排列。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('item', 'item-demo', '概览', '媒体、内容和状态操作组成完整条目。'),
      defineExample('item', 'item-variant', '变体', '对比三种公开表面。'),
      defineExample('item', 'item-size', '尺寸', '对比 default、sm 与 xs。'),
      defineExample('item', 'item-icon', '图标', '图标媒体用于文件类条目。'),
      defineExample('item', 'item-avatar', '头像', '头像媒体用于人员条目。'),
      defineExample('item', 'item-image', '图片', '图片媒体用于项目封面。'),
      defineExample('item', 'item-group', '分组', 'ItemGroup 与 ItemSeparator 构造列表。'),
      defineExample('item', 'item-header', '页眉', 'Header 承载元信息。'),
      defineExample('item', 'item-link', '链接', '通过 as 渲染为完整链接条目。'),
      defineExample('item', 'item-dropdown', '操作入口', 'Actions 放置条目级更多操作入口。'),
      defineExample('item', 'item-rtl', 'RTL', '条目支持 RTL 文本流。')
    ],
    variants: 'Item variant 支持 default、outline、muted；size 支持 default、sm、xs；ItemMedia variant 支持 default、icon、image。',
    api: [
      { name: 'Item variant', type: '\'default\' | \'outline\' | \'muted\'', defaultValue: '\'default\'', description: '条目表面层级。' },
      { name: 'Item size', type: '\'default\' | \'sm\' | \'xs\'', defaultValue: '\'default\'', description: '条目密度。' },
      { name: 'ItemGroup class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目分组的调用方类。' },
      { name: 'ItemSeparator class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目分隔线的调用方类。' },
      { name: 'ItemMedia variant', type: '\'default\' | \'icon\' | \'image\'', defaultValue: '\'default\'', description: '媒体区域形态。' },
      { name: 'ItemContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目内容区的调用方类。' },
      { name: 'ItemTitle class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目标题的调用方类。' },
      { name: 'ItemDescription class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目说明的调用方类。' },
      { name: 'ItemActions class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目操作区的调用方类。' },
      { name: 'ItemHeader class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目页眉的调用方类。' },
      { name: 'ItemFooter class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到条目页脚的调用方类。' },
      { name: 'Item as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '将 Item 渲染为语义合适的元素。' }
    ],
    accessibility: { description: '可点击整行应把 Item 渲染为 a 或 button，不能依赖 div 点击；ItemGroup 使用 list 语义时，其 Item 子项应显式传入 role=listitem，纯视觉分隔线应从无障碍树隐藏；标题和说明保持可读文本，图标媒体按用途提供 aria-hidden 或名称。' }
  },
  'kbd': {
    importCode: 'import { Kbd, KbdGroup } from \'moriui\'',
    resources: componentResources('kbd'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Kbd 表示单个按键，KbdGroup 将多个按键与分隔符作为一个快捷键序列排列。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: '快捷键字符本身保持原顺序；外围说明文字可继承 RTL 方向。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('kbd', 'kbd-demo', '概览', '在说明文字中展示快捷键。'),
      defineExample('kbd', 'kbd-group', '组合键', '多个按键组成快捷键序列。'),
      defineExample('kbd', 'kbd-button', '按钮', '按钮同时提示键盘操作。'),
      defineExample('kbd', 'kbd-tooltip', '提示', 'Tooltip 补充低频快捷键。'),
      defineExample('kbd', 'kbd-input-group', '输入组合', '搜索输入展示唤起快捷键。'),
      defineExample('kbd', 'kbd-rtl', 'RTL', '快捷键与 RTL 说明文字组合。')
    ],
    variants: 'Kbd 与 KbdGroup 没有公开视觉变体，保持统一紧凑键帽样式。',
    api: [
      { name: 'Kbd class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到单个键帽稳定样式上的调用方类。' },
      { name: 'KbdGroup class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到快捷键序列稳定样式上的调用方类。' }
    ],
    accessibility: { description: 'Kbd 只呈现按键提示，不提供交互行为。快捷键必须有等价的可见操作；使用平台符号时应结合上下文确保用户能够理解。' }
  },
  'marker': {
    importCode: 'import { Marker, MarkerContent, MarkerIcon } from \'moriui\'',
    resources: componentResources('marker'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Marker 组合 MarkerIcon 与 MarkerContent，在时间线或内容流中提供轻量标注。', shadcnHeading: 'Composition' },
      { id: '特性', title: '特性', description: '当前公开能力包含 default、border、separator 三种变体；不登记 MoriUI 未实现的 shimmer。', shadcnHeading: 'Features' },
      { id: '状态与进度', title: '状态与进度', description: '动态状态使用 role=status/aria-live，进度需要明确文本或专用 Progress。', shadcnHeading: 'Status and Progress' },
      { id: '有标签的分隔线', title: '有标签的分隔线', description: 'separator 变体用作结构分隔时提供 role=separator 与可访问名称。', shadcnHeading: 'Labeled Separators' },
      { id: '带边框标记', title: '带边框标记', description: 'border 是视觉变化；状态含义仍需由文本或 aria-label 提供。', shadcnHeading: 'Bordered Markers' },
      { id: '装饰图标', title: '装饰图标', description: '重复文字含义的图标应 aria-hidden，独立图标需要可访问名称。', shadcnHeading: 'Decorative Icons' },
      { id: '交互标记', title: '交互标记', description: '需要点击的 Marker 使用 as 渲染为 a/button，或把明确的 Button 放在标记中。', shadcnHeading: 'Interactive Markers' }
    ],
    examples: [
      defineExample('marker', 'marker-demo', '概览', '在内容流中标记时间。'),
      defineExample('marker', 'marker-variants', '变体', '对比三种公开变体。'),
      defineExample('marker', 'marker-status', '状态', '用文字与实时区域表达保存状态。'),
      defineExample('marker', 'marker-separator', '分隔线', '在分隔线上放置可读标签。'),
      defineExample('marker', 'marker-border', '描边', '描边标记同时提供状态名称。'),
      defineExample('marker', 'marker-icon', '带图标', '装饰图标与文本组合。'),
      defineExample('marker', 'marker-link-button', '链接与按钮', '在标记中放置明确操作。')
    ],
    variants: 'Marker variant 支持 default、border 与 separator。',
    api: [
      { name: 'Marker variant', type: '\'default\' | \'border\' | \'separator\'', defaultValue: '\'default\'', description: '标记的视觉结构。' },
      { name: 'Marker as', type: 'string | Component', defaultValue: '\'div\'', description: 'Marker 根元素。' },
      { name: 'Marker asChild', type: 'boolean', defaultValue: 'false', description: '将样式合并到唯一子元素。' },
      { name: 'MarkerIcon class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标记图标区域的调用方类。' },
      { name: 'MarkerContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标记内容区域的调用方类。' }
    ],
    accessibility: { description: '状态与进度使用合适的实时区域；分隔用途提供 separator 语义；图标不能成为唯一含义来源；交互标记使用 a 或 button。' }
  },
  'separator': {
    importCode: 'import { Separator } from \'moriui\'',
    resources: componentResources('separator'),
    states: [{ id: 'RTL', title: 'RTL', description: 'Separator 的 orientation 不受书写方向影响，周围内容顺序由外围 dir 控制。', shadcnHeading: 'RTL' }],
    examples: [
      defineExample('separator', 'separator-demo', '概览', '水平与垂直分隔线组合。'),
      defineExample('separator', 'separator-vertical', '垂直', '在同一行内容之间使用 vertical。'),
      defineExample('separator', 'separator-menu', '菜单', '分隔相关导航入口。'),
      defineExample('separator', 'separator-list', '列表', '在列表条目之间建立视觉边界。'),
      defineExample('separator', 'separator-rtl', 'RTL', '在 RTL 导航中使用垂直分隔线。')
    ],
    variants: 'Separator 没有视觉变体；orientation 支持 horizontal 与 vertical。',
    api: [
      { name: 'orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '分隔线方向，并同步 data-orientation。' },
      { name: 'decorative', type: 'boolean', defaultValue: 'false', description: '为 true 时使用 role=none 从无障碍树移除。' },
      { name: 'as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '来自 Reka Separator 的元素组合能力。' }
    ],
    accessibility: { description: '表达结构边界时保留默认 role=separator；纯装饰分隔线传 decorative。垂直分隔线由 Reka UI 自动提供 aria-orientation=vertical。' }
  },
  'skeleton': {
    importCode: 'import { Skeleton } from \'moriui\'',
    resources: componentResources('skeleton'),
    states: [{ id: 'RTL', title: 'RTL', description: 'Skeleton 只占位布局；在 RTL 页面中应按最终内容的逻辑方向排列。', shadcnHeading: 'RTL' }],
    examples: [
      defineExample('skeleton', 'skeleton-demo', '概览', '头像与文字占位组合。'),
      defineExample('skeleton', 'skeleton-avatar', '头像', '模拟成员条目加载。'),
      defineExample('skeleton', 'skeleton-card', '卡片', '模拟媒体卡片加载。'),
      defineExample('skeleton', 'skeleton-text', '文本', '模拟多行文字加载。'),
      defineExample('skeleton', 'skeleton-form', '表单', '模拟标签、输入与按钮。'),
      defineExample('skeleton', 'skeleton-table', '表格', '模拟表头与多行数据。'),
      defineExample('skeleton', 'skeleton-rtl', 'RTL', '占位形状按 RTL 内容布局排列。')
    ],
    variants: 'Skeleton 没有公开变体；通过 class 指定最终内容对应的宽高和圆角。',
    api: [
      { name: 'as', type: 'string | Component', defaultValue: '\'div\'', description: '占位元素。' },
      { name: 'asChild', type: 'boolean', defaultValue: 'false', description: '将占位样式合并到唯一子元素。' },
      { name: 'class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '设置与真实内容一致的尺寸和形状。' }
    ],
    accessibility: { description: 'Skeleton 本身不应被当作内容朗读；加载区域应由外围使用 aria-busy，并为持续时间较长的加载提供可读状态文本。' }
  },
  'typography': {
    importCode: 'import { Typography } from \'moriui\'',
    resources: componentResources('typography'),
    states: [
      { id: '排版类型', title: '排版类型', description: 'MoriUI 提供 h1-h6、body、body-sm、body-xs 与 code 类型，并默认映射到相应语义元素。', shadcnHeading: 'h1' },
      { id: 'RTL', title: 'RTL', description: 'align=start/end 使用逻辑方向，在 RTL 页面中无需手动交换左右对齐。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('typography', 'typography-demo', '概览', '组合标题、说明与正文。'),
      defineExample('typography', 'typography-h1', 'h1', '页面主标题。'),
      defineExample('typography', 'typography-h2', 'h2', '主要章节标题。'),
      defineExample('typography', 'typography-h3', 'h3', '次级章节标题。'),
      defineExample('typography', 'typography-h4', 'h4', '局部内容标题。'),
      defineExample('typography', 'typography-p', '段落', '默认正文排版。'),
      defineExample('typography', 'typography-blockquote', '引用', '用 as 保留引用语义。'),
      defineExample('typography', 'typography-table', '表格', '表格使用原生语义与 Nova Token。'),
      defineExample('typography', 'typography-list', '列表', '用 as 渲染语义列表。'),
      defineExample('typography', 'typography-inline-code', '行内代码', 'code 类型展示代码片段。'),
      defineExample('typography', 'typography-lead', '导语', '通过公开 class 形成导语层级。'),
      defineExample('typography', 'typography-large', '大号文字', '强调短文本。'),
      defineExample('typography', 'typography-small', '小号文字', 'body-sm 用于辅助信息。'),
      defineExample('typography', 'typography-muted', '弱化文字', 'color=muted 降低视觉层级。'),
      defineExample('typography', 'typography-rtl', 'RTL', '逻辑方向对齐适配 RTL。')
    ],
    variants: 'type 控制语义排版，align 控制逻辑对齐，color 支持 default/muted，weight 支持 normal/medium/semibold/bold，并可开启 truncate。',
    api: [
      { name: 'type', type: '\'body\' | \'body-sm\' | \'body-xs\' | \'code\' | \'h1\' | \'h2\' | \'h3\' | \'h4\' | \'h5\' | \'h6\'', defaultValue: '\'body\'', description: '排版类型与默认语义元素。' },
      { name: 'align', type: '\'start\' | \'center\' | \'end\' | \'justify\'', defaultValue: '\'start\'', description: '文字逻辑方向对齐。' },
      { name: 'color', type: '\'default\' | \'muted\'', defaultValue: '\'default\'', description: '文字颜色层级。' },
      { name: 'weight', type: '\'normal\' | \'medium\' | \'semibold\' | \'bold\'', defaultValue: 'undefined', description: '字重。' },
      { name: 'truncate', type: 'boolean', defaultValue: 'false', description: '单行截断溢出内容。' },
      { name: 'as / asChild', type: 'string | Component / boolean', defaultValue: '按 type 推导 / false', description: '覆盖默认语义元素或合并到唯一子元素。' }
    ],
    accessibility: { description: '优先让 type 与真实标题层级一致；使用 as 覆盖时仍要维护页面大纲。不要仅用字重或颜色表达层级，RTL 内容应设置正确 lang/dir。' }
  }
}

type ControlExampleSpec = readonly [name: string, title: string, description: string]

function defineControlExamples(slug: string, specs: readonly ControlExampleSpec[]) {
  return specs.map(([name, title, description]) => defineExample(slug, name, title, description))
}

const controlReferences: Record<string, ReferenceDefinition> = {
  'attachment': {
    importCode: 'import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from \'moriui\'',
    resources: componentResources('attachment'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Attachment 以 Media、Content、Actions 与可选 Trigger 组合文件元数据和操作；AttachmentGroup 负责横向附件集合。', shadcnHeading: 'Composition' },
      { id: '上传状态', title: '上传状态', description: 'state 支持 idle、uploading、processing、error 与 done；错误说明需要保留文字，不能只依赖颜色。', shadcnHeading: 'Features' },
      { id: '可访问操作', title: '可访问操作', description: 'AttachmentAction 与覆盖整卡的 AttachmentTrigger 都是独立可聚焦目标；仅图标操作必须提供 aria-label。', shadcnHeading: 'Accessibility' }
    ],
    examples: defineControlExamples('attachment', [
      ['attachment-demo', '概览', '展示文件媒体、元数据与移除操作。'],
      ['attachment-image', '图片', '图片媒体使用 image 变体与竖向布局。'],
      ['attachment-states', '上传状态', '用明确文字和图标表达上传生命周期。'],
      ['attachment-sizes', '尺寸', 'default、sm 与 xs 适配不同信息密度。'],
      ['attachment-group', '附件组', '横向滚动并吸附多个附件。'],
      ['attachment-trigger', '整卡触发器', 'AttachmentTrigger 提供覆盖整卡的独立操作入口。']
    ]),
    variants: 'Attachment 的 state 支持 idle/uploading/processing/error/done，size 支持 default/sm/xs，orientation 支持 horizontal/vertical；AttachmentMedia variant 支持 icon/image。',
    api: [
      { name: 'Attachment state', type: '\'idle\' | \'uploading\' | \'processing\' | \'error\' | \'done\'', defaultValue: '\'done\'', description: '上传生命周期与对应视觉状态。' },
      { name: 'Attachment size', type: '\'default\' | \'sm\' | \'xs\'', defaultValue: '\'default\'', description: '附件密度尺寸。' },
      { name: 'Attachment orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '媒体与内容的排列方向。' },
      { name: 'AttachmentMedia variant', type: '\'icon\' | \'image\'', defaultValue: '\'icon\'', description: '图标或图片媒体样式。' },
      { name: 'AttachmentAction variant / size', type: 'ButtonVariants', defaultValue: '\'ghost\' / \'icon-xs\'', description: '基于 MoriUI Button 的附件操作样式。' },
      { name: 'AttachmentTrigger as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '整卡触发器的语义元素组合能力。' },
      { name: 'class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '各可见槽位均合并调用方类。' }
    ],
    accessibility: { description: '附件标题与说明应包含可理解的文件名、类型、大小和失败原因。仅图标 AttachmentAction 与无文本 AttachmentTrigger 必须提供 aria-label；可滚动的纯展示 AttachmentGroup 应提供可访问名称与键盘滚动入口。' }
  },
  'button': {
    importCode: 'import { Button } from \'moriui\'',
    resources: componentResources('button'),
    states: [
      { id: '鼠标指针', title: '鼠标指针', description: 'MoriUI 不覆盖可用按钮的默认鼠标指针；如项目需要 pointer，应在应用层为非禁用按钮配置。禁用按钮使用 cursor-not-allowed。', shadcnHeading: 'Cursor' },
      { id: '语义链接', title: '语义链接', description: 'MoriUI Button 可通过 as="a" 渲染真实链接；不要把链接行为伪装成按钮事件。', shadcnHeading: 'As Link' },
      { id: 'RTL', title: 'RTL', description: '按钮内容沿逻辑方向排列，inline-start/inline-end 图标会随 dir 保持自然顺序。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('button', [
      ['button-demo', '概览', '文字按钮与仅图标按钮的基础组合。'],
      ['button-size', '尺寸', '文字和图标尺寸覆盖 xs 到 lg。'],
      ['button-default', '默认', '高强调的主要操作。'],
      ['button-outline', '描边', '中性描边操作。'],
      ['button-secondary', '次要', '弱化的次级操作。'],
      ['button-ghost', '幽灵', '工具栏中的低强调操作。'],
      ['button-destructive', '破坏性', '表达删除等不可逆动作。'],
      ['button-link', '链接样式', '保留按钮语义的链接视觉。'],
      ['button-icon', '图标按钮', '仅图标按钮使用 icon 尺寸和可访问名称。'],
      ['button-with-icon', '带图标', '用 data-icon 标识逻辑方向。'],
      ['button-rounded', '圆形', '调用方 class 可覆盖圆角。'],
      ['button-spinner', '加载中', '禁用按钮与旋转图标表达进行中状态。'],
      ['button-group-demo', '按钮组', '相关操作可放入 ButtonGroup。'],
      ['button-render', '渲染为链接', '通过 as="a" 输出语义正确的链接。'],
      ['button-rtl', 'RTL', '阿拉伯语按钮沿 RTL 内容流排列。']
    ]),
    variants: 'variant 支持 default、outline、secondary、ghost、destructive、link；size 支持 xs、sm、default、lg 及四种 icon 尺寸。',
    api: [
      { name: 'variant', type: '\'default\' | \'outline\' | \'secondary\' | \'ghost\' | \'destructive\' | \'link\'', defaultValue: '\'default\'', description: '按钮视觉层级。' },
      { name: 'size', type: '\'xs\' | \'sm\' | \'default\' | \'lg\' | \'icon-xs\' | \'icon-sm\' | \'icon\' | \'icon-lg\'', defaultValue: '\'default\'', description: '按钮尺寸。' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '原生 button 时阻止交互。' },
      { name: 'as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '选择语义元素或将样式合并到唯一子元素。' },
      { name: 'dataSlot', type: 'string', defaultValue: '\'button\'', description: '覆盖公开 data-slot，供复合组件使用。' }
    ],
    accessibility: { description: '默认输出原生 button 并保留键盘、焦点与 disabled 语义。仅图标按钮必须提供 aria-label；链接应使用 as="a" 和有效 href。' }
  },
  'button-group': {
    importCode: 'import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from \'moriui\'',
    resources: componentResources('button-group'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'ButtonGroup 可组合 Button、Input、InputGroup、Separator 和 Text，并支持嵌套分组。', shadcnHeading: 'Composition' },
      { id: '无障碍分组', title: '无障碍分组', description: '根节点输出 role="group"；调用方应通过 aria-label 或 aria-labelledby 描述整组操作。', shadcnHeading: 'Accessibility' },
      { id: '按钮组与切换组', title: '按钮组与切换组', description: 'ButtonGroup 适合立即执行的相关动作；可保持选择状态的选项应使用 ToggleGroup。', shadcnHeading: 'ButtonGroup vs ToggleGroup' },
      { id: 'RTL', title: 'RTL', description: '横向组合沿逻辑方向排列，分隔线方向会根据父组 orientation 自动推导。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('button-group', [
      ['button-group-demo', '概览', '把相关消息操作组成一组。'],
      ['button-group-orientation', '方向', 'vertical 适合纵向工具条。'],
      ['button-group-size', '尺寸', '各 Button 自己控制组内尺寸。'],
      ['button-group-nested', '嵌套', '嵌套组为复杂工具条建立间距边界。'],
      ['button-group-separator', '分隔线', '非描边按钮之间可加入视觉分隔。'],
      ['button-group-split', '拆分按钮', '主操作与更多选项保持相邻。'],
      ['button-group-input', '输入框', '将 Input 与提交按钮组合。'],
      ['button-group-input-group', '输入组合', '嵌套 InputGroup 构建消息编辑器。'],
      ['button-group-dropdown', '下拉入口', '主动作与更多选项入口组成拆分操作。'],
      ['button-group-select', '金额输入', '文字前缀、输入框与确认动作共享边界。'],
      ['button-group-popover', '助手菜单', 'MoriUI 尚未发布 Popover，此处以可操作的 DropdownMenu 承载助手选项。'],
      ['button-group-rtl', 'RTL', '在 RTL 文本流中保持自然顺序。']
    ]),
    variants: 'ButtonGroup orientation 支持 horizontal/vertical；组内控件继续使用各自的 variant 与 size。',
    api: [
      { name: 'ButtonGroup orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '分组排列方向，并写入 data-orientation。' },
      { name: 'ButtonGroup as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '根分组的元素组合能力。' },
      { name: 'ButtonGroupSeparator orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '按父组推导', description: '分隔线方向；缺省时与父组排列方向垂直。' },
      { name: 'ButtonGroupText as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '文字槽位的语义元素。' }
    ],
    accessibility: { description: 'ButtonGroup 自动输出 role="group"，但仍需 aria-label 或 aria-labelledby。Tab 在组内逐个访问按钮；需要单选/多选状态与方向键导航时应改用 ToggleGroup。' }
  },
  'checkbox': {
    importCode: 'import { Checkbox } from \'moriui\'',
    resources: componentResources('checkbox'),
    states: [
      { id: '选中状态', title: '选中状态', description: '使用 v-model 控制 boolean 或 indeterminate；defaultValue 只适用于非受控初始值。', shadcnHeading: 'Checked State' },
      { id: '无效状态', title: '无效状态', description: 'Checkbox 使用 aria-invalid，外围 Field 使用 data-invalid，使视觉与辅助技术同步。', shadcnHeading: 'Invalid State' },
      { id: '禁用状态', title: '禁用状态', description: 'disabled 由 Reka UI 阻止交互；Field 可用 data-disabled 同步标签样式。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: '复选框状态与键盘行为不受文字方向影响，标签沿外围 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('checkbox', [
      ['checkbox-demo', '概览', '组合标签、说明、选中与禁用状态。'],
      ['checkbox-invalid', '无效', '同步 aria-invalid 与 Field data-invalid。'],
      ['checkbox-basic', '基础', '用 FieldLabel 建立明确标签关联。'],
      ['checkbox-description', '说明', 'FieldContent 组织标签与帮助文字。'],
      ['checkbox-disabled', '禁用', 'disabled 阻止交互并弱化视觉。'],
      ['checkbox-group', '复选组', 'FieldSet 与 FieldGroup 组织多个独立选项。'],
      ['checkbox-table', '表格', '每行复选框都有可访问名称。'],
      ['checkbox-rtl', 'RTL', '阿拉伯语标签沿 RTL 内容流排列。']
    ]),
    variants: 'Checkbox 没有公开视觉变体；选中、未选、indeterminate、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。',
    api: [
      { name: 'v-model', type: 'boolean | \'indeterminate\'', defaultValue: 'undefined', description: '受控选中状态。' },
      { name: 'defaultValue', type: 'boolean | \'indeterminate\'', defaultValue: 'false', description: '非受控初始状态。' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '禁止焦点与切换交互。' },
      { name: 'required / name / value', type: 'CheckboxRootProps', defaultValue: 'undefined', description: '由 Reka UI 透传的表单属性。' }
    ],
    accessibility: { description: 'Checkbox 复用 Reka UI 的原生表单语义、Space 切换与状态属性。每个控件必须通过 FieldLabel、Label 或 aria-label 获得名称；无效状态同时设置 aria-invalid 和可读错误消息。' }
  },
  'combobox': {
    importCode: 'import { Combobox, ComboboxAnchor, ComboboxCancel, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from \'moriui\'',
    resources: componentResources('combobox'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'MoriUI 使用 Reka 的 Anchor、Input、Content、Viewport 与 Item 组合；不提供 Base UI 的 List、Collection 或 Chips API。', shadcnHeading: 'Composition' },
      { id: '自定义项目', title: '自定义项目', description: 'ComboboxItem 的 value 使用真实 AcceptableValue；复杂视觉可放入 Item，但筛选文本仍应清晰。', shadcnHeading: 'Custom Items' },
      { id: '多选', title: '多选', description: 'multiple 时 v-model 是值数组，选择后浮层保持打开；当前 MoriUI 不发布 Base UI Chips 子组件。', shadcnHeading: 'Multiple Selection' },
      { id: '无效与禁用', title: '无效与禁用', description: '在 ComboboxInput 设置 aria-invalid，在 Combobox 根设置 disabled；行为与状态来自 Reka UI。', shadcnHeading: 'Invalid' },
      { id: 'RTL', title: 'RTL', description: 'dir 会同时影响输入、弹层定位与键盘逻辑方向。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('combobox', [
      ['combobox-demo', '概览', '可筛选的单选框架列表。'],
      ['combobox-basic', '基础', 'Anchor、Input、Viewport 与 Item 的最小组合。'],
      ['combobox-multiple', '多选', 'multiple 与数组 v-model 管理多个选择。'],
      ['combobox-clear', '清空', 'ComboboxCancel 清空筛选并按配置重置值。'],
      ['combobox-groups', '分组', 'Group、Label 与 Separator 组织选项。'],
      ['combobox-custom', '自定义项目', '在 ComboboxItem 中组合丰富内容。'],
      ['combobox-invalid', '无效', '输入使用 aria-invalid。'],
      ['combobox-disabled', '禁用', '根组件 disabled 阻止所有交互。'],
      ['combobox-auto-highlight', '高亮', 'Reka UI 管理高亮项目与键盘导航。'],
      ['combobox-popup', '独立触发器', 'Trigger 打开包含搜索输入的弹层。'],
      ['combobox-input-group', '带图标输入', 'Anchor 内组合图标、输入和触发器。'],
      ['combobox-rtl', 'RTL', '搜索与弹层在 RTL 上下文中工作。']
    ]),
    variants: 'Combobox 没有公开视觉变体；open、highlight、selected、disabled、invalid 和 side 等状态来自 Reka UI 属性。',
    api: [
      { name: 'Combobox v-model', type: 'AcceptableValue | AcceptableValue[]', defaultValue: 'undefined / []', description: '单选或 multiple 多选值。' },
      { name: 'Combobox v-model:open', type: 'boolean', defaultValue: 'undefined', description: '受控浮层开关状态。' },
      { name: 'multiple / disabled', type: 'boolean', defaultValue: 'false', description: '多选模式与整体禁用状态。' },
      { name: 'openOnClick / openOnFocus', type: 'boolean', defaultValue: 'true / false', description: '输入交互是否打开浮层。' },
      { name: 'ignoreFilter', type: 'boolean', defaultValue: 'false', description: '关闭 Reka 内置筛选，交给调用方过滤。' },
      { name: 'resetModelValueOnClear', type: 'boolean', defaultValue: 'false', description: '清空筛选时是否同步清空选择值。' },
      { name: 'ComboboxItem value', type: 'AcceptableValue', defaultValue: '—', description: '必填项目值。' },
      { name: 'ComboboxContent side / align', type: 'PopperContentProps', defaultValue: '\'bottom\' / \'start\'', description: 'Reka Popper 的定位属性。' }
    ],
    accessibility: { description: 'Combobox 复用 Reka UI 的 combobox/listbox ARIA、活动后代、方向键、Enter 选择、Escape 关闭与 Teleport。输入必须有名称；无结果文案、项目文本和禁用/无效状态都应可被辅助技术理解。' }
  },
  'field': {
    importCode: 'import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from \'moriui\'',
    resources: componentResources('field'),
    states: [
      { id: '组合方式', title: '组合方式', description: '单个 Field 组合 Label、控件、Description 与 Error；相关控件由 FieldGroup 和语义 FieldSet 组织。', shadcnHeading: 'Composition' },
      { id: '结构', title: '结构', description: 'FieldContent 用于横向布局中的标题与说明；没有说明时不需要额外包装。', shadcnHeading: 'Anatomy' },
      { id: '响应式布局', title: '响应式布局', description: 'orientation 支持 vertical、horizontal、responsive；responsive 通过组件样式在合适容器宽度切换。', shadcnHeading: 'Responsive Layout' },
      { id: '校验与错误', title: '校验与错误', description: 'Field 使用 data-invalid，真实控件使用 aria-invalid，FieldError 以 role="alert" 输出去重后的错误。', shadcnHeading: 'Validation and Errors' }
    ],
    examples: defineControlExamples('field', [
      ['field-demo', '概览', '组合字段组、字段集、分隔线与操作。'],
      ['field-input', '输入框', '标签、输入和说明的基础字段。'],
      ['field-textarea', '多行输入', 'Textarea 与帮助文字组成反馈字段。'],
      ['field-select', '选择框', 'MoriUI Select 可复用 Field 的标签、说明与布局。'],
      ['field-slider', '滑块', '标题与说明展示当前范围值。'],
      ['field-fieldset', '字段集', 'FieldSet 与 Legend 建立语义分组。'],
      ['field-checkbox', '复选框', '多个复选字段共享说明和图例。'],
      ['field-radio', '单选', 'RadioGroup 与多个 RadioGroupItem 共享 Field 布局。'],
      ['field-switch', '开关', '横向 Field 对齐标签与 Switch。'],
      ['field-choice-card', '选择卡片', 'FieldLabel 包裹完整选择卡片。'],
      ['field-group', '字段组', 'FieldSeparator 分隔通知类别。'],
      ['field-rtl', 'RTL', '字段结构继承 RTL 文本方向。'],
      ['field-responsive', '响应式', 'responsive 在容器中调整标签与控件布局。']
    ]),
    variants: 'Field orientation 支持 vertical、horizontal、responsive；FieldLegend variant 支持 legend、label。',
    api: [
      { name: 'Field orientation', type: '\'vertical\' | \'horizontal\' | \'responsive\'', defaultValue: '\'vertical\'', description: '标签、控件和说明的布局方向。' },
      { name: 'FieldLegend variant', type: '\'legend\' | \'label\'', defaultValue: '\'legend\'', description: '语义图例的视觉层级。' },
      { name: 'FieldError errors', type: 'Array<string | { message?: string } | null | undefined>', defaultValue: '[]', description: '去重并渲染一个或多个错误消息。' },
      { name: 'FieldLabel', type: 'LabelProps', defaultValue: '—', description: '完整透传 MoriUI Label 属性。' },
      { name: 'class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '所有 Field 子组件均合并调用方类。' }
    ],
    accessibility: { description: 'FieldSet 与 FieldLegend 提供原生字段集语义，Field 输出 role="group"，FieldError 输出 role="alert"。Label 的 for 必须指向控件 id；无效控件同时使用 aria-invalid 与可读错误消息。' }
  },
  'input': {
    importCode: 'import { Input } from \'moriui\'',
    resources: componentResources('input'),
    states: [
      { id: '基础输入', title: '基础输入', description: 'Input 渲染原生 input，并通过 v-model 同步字符串值。', shadcnHeading: 'Basic' },
      { id: '禁用状态', title: '禁用状态', description: 'disabled 保留原生禁用语义；外围 Field 可使用 data-disabled 同步标签视觉。', shadcnHeading: 'Disabled' },
      { id: '无效状态', title: '无效状态', description: 'aria-invalid="true" 同时向辅助技术和 MoriUI 样式表达校验错误。', shadcnHeading: 'Invalid' },
      { id: '必填状态', title: '必填状态', description: 'required 保留原生必填校验语义，并应配合可见的必填提示。', shadcnHeading: 'Required' },
      { id: 'RTL', title: 'RTL', description: '输入内容、标签与占位符可继承或显式设置 dir。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('input', [
      ['input-demo', '概览', '密码输入、标签和安全说明。'],
      ['input-basic', '基础', '使用 v-model 同步字符串。'],
      ['input-field', '字段', 'Field 提供标签与说明。'],
      ['input-fieldgroup', '字段组', '多个 Field 组成表单。'],
      ['input-disabled', '禁用', 'disabled 保留原生不可交互语义。'],
      ['input-invalid', '无效', 'aria-invalid 与 FieldError 同步错误。'],
      ['input-file', '文件', 'type="file" 使用浏览器文件选择能力。'],
      ['input-inline', '行内', '横向 Field 组合搜索输入与按钮。'],
      ['input-grid', '网格', '并排组织姓名输入。'],
      ['input-required', '必填', 'required 与可见标记共同说明要求。'],
      ['input-badge', '徽记', '标签内用 Badge 补充推荐信息。'],
      ['input-input-group', '输入组合', '前缀、输入与图标共享输入边界。'],
      ['input-button-group', '按钮组合', 'Input 与提交按钮相邻排列。'],
      ['input-form', '表单', '多个受控输入组成完整表单。'],
      ['input-rtl', 'RTL', '阿拉伯语标签、说明与输入方向。']
    ]),
    variants: 'Input 保持单一 Nova 视觉基线；通过原生属性、Field、InputGroup 与 ButtonGroup 组合具体场景。',
    api: [
      { name: 'v-model', type: 'string', defaultValue: '\'\'', description: '当前输入值。' },
      { name: 'defaultValue', type: 'string', defaultValue: 'undefined', description: '未提供 v-model 时的初始值。' },
      { name: '原生 input 属性', type: 'InputHTMLAttributes', defaultValue: '—', description: 'type、disabled、required、placeholder、aria-invalid 等自动透传到原生 input。' },
      { name: 'class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到输入框变体类。' }
    ],
    accessibility: { description: 'Input 输出原生 input。调用方必须使用 Label/FieldLabel 或 aria-label 提供名称；错误使用 aria-invalid 和 FieldError，必填使用 required，文件输入保留浏览器原生选择与键盘行为。' }
  },
  'input-group': {
    importCode: 'import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from \'moriui\'',
    resources: componentResources('input-group'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'InputGroup 组合 InputGroupInput、Addon、Button 与 Text；MoriUI 当前不导出 InputGroupTextarea。', shadcnHeading: 'Composition' },
      { id: '附加内容对齐', title: '附加内容对齐', description: 'Addon align 支持 inline-start、inline-end、block-start 与 block-end；DOM 中应放在控件之后，以保持焦点导航。', shadcnHeading: 'Align' },
      { id: '自定义控件', title: '自定义控件', description: 'MoriUI Textarea 等控件可作为 InputGroup 的自定义控制区，并与块级附加内容共同布局。', shadcnHeading: 'Custom Input' },
      { id: 'RTL', title: 'RTL', description: 'inline-start 和 inline-end 是逻辑方向，在 RTL 中自然翻转。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('input-group', [
      ['input-group-demo', '概览', '搜索图标、输入和结果数量共享边界。'],
      ['input-group-inline-start', '行内起始', '图标位于逻辑起始侧。'],
      ['input-group-inline-end', '行内结束', '操作位于逻辑结束侧。'],
      ['input-group-block-start', '块级起始', '标题附加内容位于控件上方。'],
      ['input-group-block-end', '块级结束', '辅助内容位于控件下方。'],
      ['input-group-icon', '图标', '组合起始与结束图标。'],
      ['input-group-text', '文字', '货币、协议和单位作为附加文字。'],
      ['input-group-button', '按钮', '复制、收藏等操作位于输入边界内。'],
      ['input-group-kbd', '快捷键', 'Kbd 提示全局搜索快捷键。'],
      ['input-group-dropdown', '菜单入口', '紧凑按钮提供更多选择入口。'],
      ['input-group-spinner', '加载状态', 'Spinner 与状态文字表达进行中任务。'],
      ['input-group-textarea', '多行输入', 'MoriUI Textarea 与块级 Addon 组成多行编辑器。'],
      ['input-group-custom', '自定义控件', '自定义自动增高 textarea 保持统一焦点处理。'],
      ['input-group-rtl', 'RTL', '逻辑对齐在 RTL 中保持自然顺序。']
    ]),
    variants: 'InputGroupAddon align 支持 inline-start/inline-end/block-start/block-end；InputGroupButton size 支持 xs/sm/icon-xs/icon-sm，variant 复用 Button。',
    api: [
      { name: 'InputGroup class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到 role="group" 根容器。' },
      { name: 'InputGroupAddon align', type: '\'inline-start\' | \'inline-end\' | \'block-start\' | \'block-end\'', defaultValue: '\'inline-start\'', description: '附加内容的逻辑位置。' },
      { name: 'InputGroupInput v-model', type: 'string', defaultValue: '\'\'', description: '输入组合中的受控字符串值。' },
      { name: 'InputGroupInput defaultValue', type: 'string', defaultValue: 'undefined', description: '非受控初始值。' },
      { name: 'InputGroupButton variant', type: 'ButtonVariants["variant"]', defaultValue: '\'ghost\'', description: '内嵌按钮视觉层级。' },
      { name: 'InputGroupButton size', type: '\'xs\' | \'sm\' | \'icon-xs\' | \'icon-sm\'', defaultValue: '\'xs\'', description: '内嵌按钮尺寸。' }
    ],
    accessibility: { description: 'InputGroup 不替代输入标签，仍需 FieldLabel 或 aria-label。Addon 应在 DOM 中位于控件之后；点击非交互附加内容会聚焦 data-slot="input-group-control"，按钮、链接等交互元素保持独立焦点。' }
  },
  'input-otp': {
    importCode: 'import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from \'moriui\'',
    resources: componentResources('input-otp'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'InputOTP 基于 Reka PinInput，按索引组合 Slot，并可用 Group 与 Separator 建立视觉分段。', shadcnHeading: 'Composition' },
      { id: '输入类型', title: '输入类型', description: 'MoriUI 使用 type="number" 限制数字，使用 type="text" 接受字母数字；不公开 input-otp 的 pattern/maxLength 字符串 API。', shadcnHeading: 'Pattern' },
      { id: '受控状态', title: '受控状态', description: 'v-model 是 string[] 或 number[]；每个 InputOTPSlot 的 index 决定对应数组位置。', shadcnHeading: 'Controlled' },
      { id: '无效与禁用', title: '无效与禁用', description: 'disabled 设置在 InputOTP 根；无效样式和辅助技术状态设置在各 InputOTPSlot 的 aria-invalid。', shadcnHeading: 'Invalid' },
      { id: 'RTL', title: 'RTL', description: 'dir 由 Reka UI 用于左右方向键顺序和输入组阅读方向。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('input-otp', [
      ['input-otp-demo', '概览', '六位数字验证码。'],
      ['input-otp-pattern', '仅数字', 'type="number" 过滤非数字输入。'],
      ['input-otp-separator', '分隔符', 'Group 与 Separator 将验证码分段。'],
      ['input-otp-disabled', '禁用', 'disabled 阻止所有验证码格交互。'],
      ['input-otp-controlled', '受控', '数组 v-model 实时展示当前值。'],
      ['input-otp-invalid', '无效', '每个 Slot 使用 aria-invalid。'],
      ['input-otp-four-digits', '四位 PIN', '四个索引组成常见 PIN 输入。'],
      ['input-otp-alphanumeric', '字母数字', 'type="text" 接受字母与数字。'],
      ['input-otp-form', '表单', '验证卡片组合标签、重发与提交操作。'],
      ['input-otp-rtl', 'RTL', '验证码在 RTL 方向中保持正确键盘顺序。']
    ]),
    variants: 'InputOTP 无公开视觉变体；type 支持 text/number，otp 默认为 true，Slot 数量由调用方组合决定。',
    api: [
      { name: 'InputOTP v-model', type: 'string[] | number[]', defaultValue: '[]', description: '按 Slot index 排列的验证码值。' },
      { name: 'InputOTP type', type: '\'text\' | \'number\'', defaultValue: '\'text\'', description: '文本或数字输入模式，并决定 v-model 数组类型。' },
      { name: 'InputOTP otp', type: 'boolean', defaultValue: 'true', description: '启用一次性验证码自动填充与顺序输入。' },
      { name: 'InputOTP disabled / required', type: 'boolean', defaultValue: 'false', description: '整体禁用与表单必填语义。' },
      { name: 'InputOTP mask', type: 'boolean', defaultValue: 'false', description: '以密码形式隐藏每格内容。' },
      { name: 'InputOTP @complete', type: '(value: string[] | number[]) => void', defaultValue: '—', description: '所有已渲染 Slot 填满时触发。' },
      { name: 'InputOTPSlot index', type: 'number', defaultValue: '—', description: '必填的数组位置。' }
    ],
    accessibility: { description: 'InputOTP 复用 Reka PinInput 的粘贴分发、自动前进、退格、方向键与隐藏表单输入。根组件需要标签或 aria-label；禁用设置在根，无效状态设置在对应 Slot，并提供可读错误说明。' }
  },
  'label': {
    importCode: 'import { Label } from \'moriui\'',
    resources: componentResources('label'),
    states: [
      { id: '字段中的标签', title: '字段中的标签', description: '完整字段优先使用 FieldLabel、FieldDescription 与 FieldError；独立场景直接使用 Label。', shadcnHeading: 'Label in Field' },
      { id: 'RTL', title: 'RTL', description: 'Label 继承外围 dir，并通过 for 关联方向无关的控件 id。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('label', [
      ['label-demo', '概览', 'Label 与 Checkbox 通过 for/id 建立关联。'],
      ['label-rtl', 'RTL', '阿拉伯语标签继承 RTL 方向。']
    ]),
    variants: 'Label 没有公开视觉变体；调用方 class 与 Reka LabelProps 完整透传。',
    api: [
      { name: 'for', type: 'string', defaultValue: 'undefined', description: '关联表单控件的 id。' },
      { name: 'as / asChild', type: 'string | Component / boolean', defaultValue: '\'label\' / false', description: '来自 Reka Label 的元素组合能力。' },
      { name: 'class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标签基础样式。' }
    ],
    accessibility: { description: 'Label 复用 Reka UI 的 label 行为。for 必须指向唯一控件 id，点击标签即可聚焦或切换控件；不要用无语义文本替代标签，复杂表单优先组合 FieldLabel。' }
  },
  'radio-group': {
    importCode: 'import { RadioGroup, RadioGroupItem } from \'moriui\'',
    resources: componentResources('radio-group'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'RadioGroup 管理唯一选中值，RadioGroupItem 以必填 value 标识选项；标签、说明与错误由 Field 组合。', shadcnHeading: 'Composition' },
      { id: '受控与默认值', title: '受控与默认值', description: '使用 v-model 持有当前 AcceptableValue；无需受控时可用 defaultValue 设置初始选择。', shadcnHeading: 'Usage' },
      { id: '禁用与无效', title: '禁用与无效', description: 'disabled 可设置在整组或单个 Item；无效项使用 aria-invalid，外围 Field 使用 data-invalid。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: 'dir 影响方向键顺序与内容阅读方向，Reka UI 负责 roving focus 和循环导航。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('radio-group', [
      ['radio-group-demo', '概览', '用 v-model 在三个界面密度中保持唯一选择。'],
      ['radio-group-description', '说明', 'FieldContent 为每个选项组合标签与帮助文字。'],
      ['radio-group-choice-card', '选择卡片', 'FieldLabel 包裹整行内容，扩大可点击区域。'],
      ['radio-group-fieldset', '字段集', 'FieldSet 与 FieldLegend 建立订阅方案的语义分组。'],
      ['radio-group-disabled', '禁用', '单个 disabled 项与可选项共存。'],
      ['radio-group-invalid', '无效', 'aria-invalid 与 Field data-invalid 同步错误状态。'],
      ['radio-group-rtl', 'RTL', '阿拉伯语选项使用 RTL 方向与正确的键盘顺序。']
    ]),
    variants: 'RadioGroup 没有公开视觉或尺寸变体；选中、未选、disabled、invalid 与 orientation 状态由 Reka UI 属性驱动。',
    api: [
      { name: 'RadioGroup v-model', type: 'AcceptableValue', defaultValue: 'undefined', description: '当前唯一选中值。' },
      { name: 'RadioGroup defaultValue', type: 'AcceptableValue', defaultValue: 'undefined', description: '非受控初始选中值。' },
      { name: 'RadioGroup disabled / required', type: 'boolean', defaultValue: 'false', description: '整组禁用与表单必填语义。' },
      { name: 'RadioGroup orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: 'undefined', description: '方向键导航方向。' },
      { name: 'RadioGroup dir / loop', type: '\'ltr\' | \'rtl\' / boolean', defaultValue: '继承 / true', description: '阅读方向与循环键盘导航。' },
      { name: 'RadioGroupItem value', type: 'AcceptableValue', defaultValue: '—', description: '必填的选项值。' },
      { name: 'RadioGroupItem disabled', type: 'boolean', defaultValue: 'false', description: '单独禁用当前选项。' }
    ],
    accessibility: { description: 'RadioGroup 复用 Reka UI 的 radiogroup/radio ARIA、方向键、Space 选择与 roving focus。整组应有 FieldLegend 或 aria-label，每个 Item 必须关联可读标签；错误同时使用 aria-invalid 与文字说明。' }
  },
  'select': {
    importCode: 'import { Select, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SelectViewport } from \'moriui\'',
    resources: componentResources('select'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Select 组合 Trigger/Value 与 Teleport 的 Content/Viewport；项目由 Item、ItemText 和 Indicator 组成。', shadcnHeading: 'Composition' },
      { id: '定位方式', title: '定位方式', description: 'SelectContent 使用 position="item-aligned" 对齐已选项，或使用默认 popper 相对触发器定位。', shadcnHeading: 'Align Item With Trigger' },
      { id: '分组与滚动', title: '分组与滚动', description: 'Group、Label 与 Separator 组织长列表；Viewport 和上下滚动按钮处理超出可用高度的选项。', shadcnHeading: 'Groups' },
      { id: '禁用与无效', title: '禁用与无效', description: '根组件 disabled 阻止全部交互，Item 也可单独禁用；Trigger 使用 aria-invalid 表达无效状态。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: 'dir 同时影响触发器、弹层定位、选项阅读和方向键行为。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('select', [
      ['select-demo', '概览', '组合水果选项与受控 v-model。'],
      ['select-align-item', '对齐已选项', '用真实 position API 切换 item-aligned 与 popper 定位。'],
      ['select-groups', '分组', 'Group、Label 与 Separator 区分水果和蔬菜。'],
      ['select-scrollable', '可滚动', 'Viewport 与滚动按钮承载跨地区时区列表。'],
      ['select-disabled', '禁用', '根组件 disabled 阻止打开与选择。'],
      ['select-invalid', '无效', 'Trigger 的 aria-invalid 与 FieldError 提供完整错误反馈。'],
      ['select-rtl', 'RTL', '阿拉伯语分组选项在 RTL 弹层中工作。']
    ]),
    variants: 'SelectTrigger 的 size 支持 sm/default；SelectContent position 支持 item-aligned/popper。其他视觉状态由 open、highlighted、checked、disabled、invalid 与 side 属性驱动。',
    api: [
      { name: 'Select v-model', type: 'AcceptableValue | AcceptableValue[]', defaultValue: 'undefined / []', description: '单选或 multiple 多选值。' },
      { name: 'Select v-model:open', type: 'boolean', defaultValue: 'undefined', description: '受控弹层开关状态。' },
      { name: 'Select defaultValue / defaultOpen', type: 'AcceptableValue | AcceptableValue[] / boolean', defaultValue: 'undefined / false', description: '非受控初始值与初始打开状态。' },
      { name: 'Select multiple / disabled', type: 'boolean', defaultValue: 'false', description: '多选模式与整体禁用状态。' },
      { name: 'Select by', type: 'string | ((a, b) => boolean)', defaultValue: 'undefined', description: '对象值的比较字段或比较函数。' },
      { name: 'SelectTrigger size', type: '\'sm\' | \'default\'', defaultValue: '\'default\'', description: '触发器尺寸。' },
      { name: 'SelectContent position', type: '\'item-aligned\' | \'popper\'', defaultValue: '\'popper\'', description: '弹层相对已选项或触发器的定位方式。' },
      { name: 'SelectContent side / align', type: 'PopperContentProps', defaultValue: '\'bottom\' / \'center\'', description: 'popper 模式的方向与对齐。' },
      { name: 'SelectItem value / disabled', type: 'AcceptableValue / boolean', defaultValue: '— / false', description: '必填项目值与单项禁用状态。' }
    ],
    accessibility: { description: 'Select 复用 Reka UI 的 listbox ARIA、焦点管理、类型搜索、方向键、Enter/Space 选择、Escape 关闭与触发器焦点归还。Trigger 必须有名称，ItemText 应提供清晰文本，错误需配合 aria-invalid 与可读说明。' }
  },
  'slider': {
    importCode: 'import { Slider, SliderRange, SliderThumb, SliderTrack } from \'moriui\'',
    resources: componentResources('slider'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Slider 组合 Track、Range 与一个或多个 Thumb；Thumb 数量应与 v-model 数组长度一致。', shadcnHeading: 'Usage' },
      { id: '范围与多控制点', title: '范围与多控制点', description: '两个值表示范围，更多值创建多个控制点；minStepsBetweenThumbs 可约束相邻值间距。', shadcnHeading: 'Range' },
      { id: '垂直方向', title: '垂直方向', description: 'orientation="vertical" 切换布局与上下方向键，控件仍使用同一 Track/Range/Thumb 组合。', shadcnHeading: 'Vertical' },
      { id: '受控与禁用', title: '受控与禁用', description: 'v-model 实时同步 number[]；valueCommit 只在一次拖动或键盘操作结束后触发，disabled 阻止交互。', shadcnHeading: 'Controlled' },
      { id: 'RTL', title: 'RTL', description: '水平 Slider 的方向键与值增长方向遵循 dir，垂直方向不受文字流影响。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('slider', [
      ['slider-demo', '概览', '单控制点选择 0 到 100 的值。'],
      ['slider-range', '范围', '两个 Thumb 选择起点与终点。'],
      ['slider-multiple', '多个控制点', '三个值创建三个可独立操作的 Thumb。'],
      ['slider-vertical', '垂直', '两条垂直 Slider 使用上下方向键。'],
      ['slider-controlled', '受控', 'v-model 实时显示两个温度边界。'],
      ['slider-disabled', '禁用', 'disabled 保留当前值并阻止操作。'],
      ['slider-rtl', 'RTL', '水平滑杆在 RTL 方向中调整值。']
    ]),
    variants: 'Slider 没有公开视觉或尺寸变体；orientation、disabled、dir 与多 Thumb 状态由 Reka UI 驱动。',
    api: [
      { name: 'Slider v-model', type: 'number[] | null', defaultValue: '[0]', description: '按 Thumb 顺序排列的当前值。' },
      { name: 'Slider defaultValue', type: 'number[]', defaultValue: '[0]', description: '非受控初始值，同时决定初始 Thumb 数量。' },
      { name: 'Slider min / max / step', type: 'number', defaultValue: '0 / 100 / 1', description: '数值范围与步进。' },
      { name: 'Slider orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '布局与键盘导航方向。' },
      { name: 'Slider disabled / inverted', type: 'boolean', defaultValue: 'false', description: '禁用交互与反转视觉值方向。' },
      { name: 'Slider minStepsBetweenThumbs', type: 'number', defaultValue: '0', description: '相邻 Thumb 之间允许的最小步数。' },
      { name: 'Slider thumbAlignment', type: '\'contain\' | \'overflow\'', defaultValue: '\'contain\'', description: 'Thumb 在轨道边界内的对齐方式。' },
      { name: 'Slider @valueCommit', type: '(value: number[]) => void', defaultValue: '—', description: '一次值修改交互结束时触发。' }
    ],
    accessibility: { description: 'Slider 复用 Reka UI 的 slider ARIA、Home/End、Page Up/Page Down、方向键和隐藏表单输入。每个 Thumb 都应通过 aria-label 或关联标签获得名称；范围 Slider 需分别说明起点和终点。' }
  },
  'switch': {
    importCode: 'import { Switch } from \'moriui\'',
    resources: componentResources('switch'),
    states: [
      { id: '开关状态', title: '开关状态', description: 'Switch 使用 v-model 持有 boolean 或自定义 trueValue/falseValue，checked/unchecked 状态由 Reka UI 输出。', shadcnHeading: 'Usage' },
      { id: '说明与选择卡片', title: '说明与选择卡片', description: 'FieldContent 组合标签和说明；FieldLabel 可包裹整行以扩大开关的可点击区域。', shadcnHeading: 'Description' },
      { id: '禁用与无效', title: '禁用与无效', description: 'disabled 阻止切换；aria-invalid 与外围 Field 的 data-invalid 同步校验状态。', shadcnHeading: 'Disabled' },
      { id: '尺寸', title: '尺寸', description: 'size 支持 sm 与 default，两者保持相同的键盘和表单行为。', shadcnHeading: 'Size' },
      { id: 'RTL', title: 'RTL', description: '开关状态不依赖书写方向，标签与说明沿 Field 的 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('switch', [
      ['switch-demo', '概览', '开关与标签通过 id/for 关联。'],
      ['switch-description', '说明', '横向 Field 对齐说明文字与状态开关。'],
      ['switch-choice-card', '选择卡片', '整行标签提供更大的可点击区域。'],
      ['switch-disabled', '禁用', 'disabled 阻止切换并同步 Field 视觉。'],
      ['switch-invalid', '无效', 'aria-invalid 与文字说明表达必选要求。'],
      ['switch-sizes', '尺寸', 'sm 与 default 适配不同密度。'],
      ['switch-rtl', 'RTL', '阿拉伯语标签在 RTL 横向布局中工作。']
    ]),
    variants: 'Switch 的 size 支持 sm/default；checked、unchecked、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。',
    api: [
      { name: 'Switch v-model', type: 'T | null', defaultValue: 'falseValue', description: '当前开关值。' },
      { name: 'Switch defaultValue', type: 'T', defaultValue: 'falseValue', description: '非受控初始值。' },
      { name: 'Switch trueValue / falseValue', type: 'T', defaultValue: 'true / false', description: '开启与关闭状态对应的模型值。' },
      { name: 'Switch size', type: '\'sm\' | \'default\'', defaultValue: '\'default\'', description: '开关尺寸。' },
      { name: 'Switch disabled / required', type: 'boolean', defaultValue: 'false', description: '禁用交互与表单必填语义。' },
      { name: 'Switch name / value', type: 'string', defaultValue: 'undefined / \'on\'', description: '隐藏表单控件的名称与提交值。' },
      { name: 'Switch as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '元素组合能力；默认保留 button 与 switch 语义。' }
    ],
    accessibility: { description: 'Switch 复用 Reka UI 的 role="switch"、aria-checked、Space/Enter 切换与隐藏表单输入。必须关联 FieldLabel/Label 或提供 aria-label；禁用使用 disabled，无效使用 aria-invalid 和可读说明。' }
  },
  'textarea': {
    importCode: 'import { Textarea } from \'moriui\'',
    resources: componentResources('textarea'),
    states: [
      { id: '基础输入', title: '基础输入', description: 'Textarea 渲染原生 textarea，并通过字符串 v-model 同步多行内容。', shadcnHeading: 'Usage' },
      { id: '字段组合', title: '字段组合', description: '使用 FieldLabel、FieldDescription 与 FieldError 提供名称、帮助和校验反馈。', shadcnHeading: 'Field' },
      { id: '禁用与无效', title: '禁用与无效', description: 'disabled 保留原生禁用语义；aria-invalid 与外围 Field 的 data-invalid 同步错误状态。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: 'textarea 的文字、占位符和光标方向可继承或显式设置 dir。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('textarea', [
      ['textarea-demo', '概览', '通过 v-model 编辑多行消息。'],
      ['textarea-field', '字段', 'Field 组合标签、说明与多行输入。'],
      ['textarea-disabled', '禁用', 'disabled 阻止编辑并保留当前内容。'],
      ['textarea-invalid', '无效', 'aria-invalid 与 FieldError 提供完整错误反馈。'],
      ['textarea-button', '操作按钮', '多行输入与发送按钮组成消息编辑区。'],
      ['textarea-rtl', 'RTL', '阿拉伯语反馈输入使用 RTL 文本方向。']
    ]),
    variants: 'Textarea 没有公开视觉或尺寸变体；通过 rows、disabled、required、aria-invalid 等原生属性描述具体场景。',
    api: [
      { name: 'Textarea v-model', type: 'string', defaultValue: '\'\'', description: '当前多行文本值。' },
      { name: 'Textarea defaultValue', type: 'string', defaultValue: 'undefined', description: '未提供 v-model 时的初始值。' },
      { name: '原生 textarea 属性', type: 'TextareaHTMLAttributes', defaultValue: '—', description: 'rows、disabled、required、placeholder、maxlength、aria-invalid 等自动透传。' },
      { name: 'class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到 Textarea 的 Nova 基础样式。' }
    ],
    accessibility: { description: 'Textarea 输出原生 textarea，必须使用 FieldLabel/Label 或 aria-label 提供名称。错误使用 aria-invalid 和 FieldError，必填使用 required；不要用 placeholder 替代持久可见的标签。' }
  },
  'toggle': {
    importCode: 'import { Toggle } from \'moriui\'',
    resources: componentResources('toggle'),
    states: [
      { id: '切换状态', title: '切换状态', description: 'Toggle 通过 boolean v-model 表达 on/off，并输出 aria-pressed 与 data-state。', shadcnHeading: 'Usage' },
      { id: '变体与尺寸', title: '变体与尺寸', description: 'variant 支持 default/outline，size 支持 sm/default/lg；图标与文字可直接放入默认插槽。', shadcnHeading: 'Outline' },
      { id: '禁用状态', title: '禁用状态', description: 'disabled 使用原生 button 禁用语义并阻止 pressed 状态变化。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: '图标与文字按内容流排列，Toggle 自身的 on/off 行为不依赖书写方向。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('toggle', [
      ['toggle-demo', '概览', '描边小号收藏按钮保持受控状态。'],
      ['toggle-outline', '描边', '两个独立 Toggle 控制斜体与粗体。'],
      ['toggle-text', '图标与文字', '默认变体组合图标和可读文字。'],
      ['toggle-sizes', '尺寸', 'sm、default 与 lg 覆盖常用密度。'],
      ['toggle-disabled', '禁用', '默认与描边变体都保留禁用语义。'],
      ['toggle-rtl', 'RTL', '阿拉伯语收藏按钮沿 RTL 内容流排列。']
    ]),
    variants: 'Toggle 的 variant 支持 default/outline，size 支持 sm/default/lg；on、off、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。',
    api: [
      { name: 'Toggle v-model', type: 'boolean | null', defaultValue: 'undefined', description: '受控 pressed 状态。' },
      { name: 'Toggle defaultValue', type: 'boolean', defaultValue: 'undefined', description: '非受控初始 pressed 状态。' },
      { name: 'Toggle variant', type: '\'default\' | \'outline\'', defaultValue: '\'default\'', description: '切换按钮视觉层级。' },
      { name: 'Toggle size', type: '\'sm\' | \'default\' | \'lg\'', defaultValue: '\'default\'', description: '切换按钮尺寸。' },
      { name: 'Toggle disabled / required', type: 'boolean', defaultValue: 'false', description: '禁用交互与隐藏表单控件的必填语义。' },
      { name: 'Toggle name', type: 'string', defaultValue: 'undefined', description: '独立 Toggle 作为表单控件时的字段名。' },
      { name: 'Toggle as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '元素组合能力；默认输出原生 button。' }
    ],
    accessibility: { description: 'Toggle 复用 Reka UI 的原生 button、aria-pressed、Space/Enter 与隐藏表单输入。仅图标 Toggle 必须提供 aria-label；连续选择一组相关状态时应使用 ToggleGroup，而不是手动组合多个独立 Toggle。' }
  },
  'toggle-group': {
    importCode: 'import { ToggleGroup, ToggleGroupItem } from \'moriui\'',
    resources: componentResources('toggle-group'),
    states: [
      { id: '单选与多选', title: '单选与多选', description: 'type="single" 使用单个 AcceptableValue，type="multiple" 使用值数组；也可由 v-model/defaultValue 的形状推断。', shadcnHeading: 'Usage' },
      { id: '变体、尺寸与间距', title: '变体、尺寸与间距', description: '根组件统一向 Item 提供 variant、size 和 spacing，单个 Item 仍可覆盖视觉变体或尺寸。', shadcnHeading: 'Outline' },
      { id: '垂直方向', title: '垂直方向', description: 'orientation="vertical" 切换布局与上下方向键；默认 horizontal 使用左右方向键。', shadcnHeading: 'Vertical' },
      { id: '禁用与自定义', title: '禁用与自定义', description: '根 disabled 禁用整组，Item 也可单独禁用；默认插槽可组合图标、文字和自定义内容。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: '水平组的左右方向键顺序遵循 dir，垂直组继续使用上下方向键。', shadcnHeading: 'RTL' }
    ],
    examples: defineControlExamples('toggle-group', [
      ['toggle-group-demo', '概览', 'multiple 模式控制多个文字格式。'],
      ['toggle-group-outline', '描边', 'single 模式在全部与未接筛选之间切换。'],
      ['toggle-group-sizes', '尺寸', 'sm 与 default 展示不同密度。'],
      ['toggle-group-spacing', '间距', 'spacing 调整 Item 之间的组件局部间距。'],
      ['toggle-group-vertical', '垂直', '垂直多选组使用上下方向键。'],
      ['toggle-group-disabled', '禁用', '根 disabled 阻止整组状态变化。'],
      ['toggle-group-font-weight-selector', '自定义字重', 'Item 默认插槽组合字样与辅助标签。'],
      ['toggle-group-rtl', 'RTL', '阿拉伯语单选组使用 RTL 键盘顺序。']
    ]),
    variants: 'ToggleGroup 的 variant 支持 default/outline，size 支持 sm/default/lg，orientation 支持 horizontal/vertical；spacing 默认 2，并通过局部 Token 控制项目间距。',
    api: [
      { name: 'ToggleGroup v-model', type: 'AcceptableValue | AcceptableValue[]', defaultValue: 'undefined', description: 'single 单值或 multiple 值数组。' },
      { name: 'ToggleGroup type', type: '\'single\' | \'multiple\'', defaultValue: '按值形状推断', description: '显式指定单选或多选模式。' },
      { name: 'ToggleGroup defaultValue', type: 'AcceptableValue | AcceptableValue[]', defaultValue: 'undefined', description: '非受控初始选择。' },
      { name: 'ToggleGroup variant', type: '\'default\' | \'outline\'', defaultValue: '\'default\'', description: '整组 Item 的默认视觉层级。' },
      { name: 'ToggleGroup size', type: '\'sm\' | \'default\' | \'lg\'', defaultValue: '\'default\'', description: '整组 Item 的默认尺寸。' },
      { name: 'ToggleGroup spacing', type: 'number', defaultValue: '2', description: 'Item 之间的间距倍数。' },
      { name: 'ToggleGroup orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '布局与方向键导航方向。' },
      { name: 'ToggleGroup disabled / rovingFocus / loop', type: 'boolean', defaultValue: 'false / true / true', description: '整组禁用、移动焦点与循环导航。' },
      { name: 'ToggleGroupItem value', type: 'AcceptableValue', defaultValue: '—', description: '必填项目值。' },
      { name: 'ToggleGroupItem disabled', type: 'boolean', defaultValue: 'false', description: '单独禁用当前项目。' }
    ],
    accessibility: { description: 'ToggleGroup 复用 Reka UI 的 group、aria-pressed、roving focus、方向键与循环导航。根组件需要 aria-label 或 aria-labelledby；每个仅图标 Item 必须有 aria-label，orientation 应与视觉排列一致。' }
  }
}

const references: Partial<Record<string, ReferenceDefinition>> = {
  ...baseReferences,
  'dialog': {
    importCode: 'import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from \'moriui\'',
    resources: [
      { label: '组件源码', href: 'https://github.com/AntzyMo/moriui/tree/main/packages/core/src/components/dialog' },
      { label: '问题反馈', href: 'https://github.com/AntzyMo/moriui/issues' }
    ],
    states: [
      {
        id: '组合方式',
        title: '组合方式',
        description: '使用 Dialog、DialogTrigger 和 DialogContent 组织模态窗口；内容内可使用 Header、Title、Description 与 Footer 提供清晰结构。',
        shadcnHeading: 'Composition'
      },
      { id: '自定义关闭按钮', title: '自定义关闭按钮', description: 'DialogClose 提供自定义关闭触发器，可用于替换默认关闭控件。', shadcnHeading: 'Custom Close Button' },
      { id: '无关闭按钮', title: '无关闭按钮', description: 'showCloseButton 控制默认关闭控件的显示与隐藏。', shadcnHeading: 'No Close Button' },
      { id: '固定底部', title: '固定底部', description: 'DialogFooter 固定在底部，内容区域独立滚动，操作始终可见。', shadcnHeading: 'Sticky Footer' },
      { id: '可滚动内容', title: '可滚动内容', description: '长内容在固定 Header 下方滚动，适合条款等长文本。', shadcnHeading: 'Scrollable Content' },
      { id: 'RTL', title: 'RTL', description: '对话框继承外围书写方向，内容随 dir 调整。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('dialog', 'dialog-demo', '概览', '在不中断当前上下文的情况下展示聚焦任务。'),
      defineExample('dialog', 'dialog-close-button', '自定义关闭按钮', '使用 DialogClose 替换默认关闭控件。'),
      defineExample('dialog', 'dialog-no-close-button', '无关闭按钮', '隐藏默认关闭按钮。'),
      defineExample('dialog', 'dialog-sticky-footer', '固定底部', '操作栏固定在底部。'),
      defineExample('dialog', 'dialog-scrollable-content', '可滚动内容', '长内容在固定头部下方滚动。'),
      defineExample('dialog', 'dialog-rtl', 'RTL', '从右到左的对话框内容。')
    ],
    variants: 'DialogContent 提供统一模态表面；用 Header、Title、Description 与 Footer 组织语义结构。',
    api: [
      { name: 'Dialog v-model:open', type: 'boolean', defaultValue: 'undefined', description: '对话框的受控打开状态。' },
      { name: 'Dialog defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控对话框的初始状态。' },
      { name: 'Dialog modal', type: 'boolean', defaultValue: 'true', description: '是否阻断背景区域交互。' },
      { name: 'DialogContent showCloseButton', type: 'boolean', defaultValue: 'true', description: '是否显示默认关闭按钮。' },
      { name: 'DialogClose as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '关闭触发器的元素组合能力。' },
      { name: 'DialogHeader class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到对话框头部的调用方类。' },
      { name: 'DialogFooter class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到对话框脚部的调用方类。' }
    ],
    accessibility: {
      description: 'Dialog 复用 Reka UI 的焦点管理、Escape 关闭、遮罩交互和触发器焦点归还。DialogContent 内应提供 DialogTitle，并在需要补充说明时提供 DialogDescription。'
    }
  },
  'alert': {
    importCode: 'import { Alert, AlertAction, AlertDescription, AlertTitle } from \'moriui\'',
    resources: componentResources('alert'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Alert 由 Title、Description 和 Action 组成，适合在页面内展示即时反馈。', shadcnHeading: 'Composition' },
      { id: '变体', title: '变体', description: 'variant 支持 default 与 destructive，通过颜色区分信息层级。', shadcnHeading: 'Variant' },
      { id: 'RTL', title: 'RTL', description: 'Alert 继承外围书写方向；图标与文本顺序会随 dir 调整。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('alert', 'alert-demo', '概览', '警告提示展示关键信息。'),
      defineExample('alert', 'alert-basic', '基础', '默认变体用于通用提示。'),
      defineExample('alert', 'alert-destructive', '破坏性', 'destructive 变体表达危险操作。'),
      defineExample('alert', 'alert-colors', '自定义颜色', '调用方可覆盖局部颜色。'),
      defineExample('alert', 'alert-action', '操作', 'AlertAction 可放置关闭或更多操作。'),
      defineExample('alert', 'alert-rtl', 'RTL', '在 RTL 页面中保持自然的内容顺序。')
    ],
    variants: 'Alert variant 支持 default 与 destructive。',
    api: [
      { name: 'Alert variant', type: '\'default\' | \'destructive\'', defaultValue: '\'default\'', description: '警报的视觉层级。' },
      { name: 'AlertTitle class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标题的调用方类。' },
      { name: 'AlertDescription class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到说明的调用方类。' },
      { name: 'AlertAction class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到操作区域的调用方类。' }
    ],
    accessibility: { description: 'Alert 根元素默认包含 role="alert"，能够触发屏幕阅读器的即时朗读。动态出现的 Alert 会通过该角色自动宣告。' }
  },
  'alert-dialog': {
    importCode: 'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from \'moriui\'',
    resources: componentResources('alert-dialog'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'AlertDialog 由 Trigger、Portal、Overlay、Content、Header、Media、Title、Description、Footer、Action 与 Cancel 组成。', shadcnHeading: 'Composition' },
      { id: '尺寸', title: '尺寸', description: 'Content size 支持 default 与 sm，配合 Media 区域形成灵活布局。', shadcnHeading: 'Size' },
      { id: 'RTL', title: 'RTL', description: '对话框内容沿外围 dir 排列，Action 与 Cancel 位置会随逻辑方向调整。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('alert-dialog', 'alert-dialog-demo', '概览', '确认操作的对话框。'),
      defineExample('alert-dialog', 'alert-dialog-basic', '基础', '默认确认对话框。'),
      defineExample('alert-dialog', 'alert-dialog-destructive', '破坏性', '用于不可逆操作的确认。'),
      defineExample('alert-dialog', 'alert-dialog-media', '媒体', '在对话框中展示图标或图片媒体。'),
      defineExample('alert-dialog', 'alert-dialog-small', '小尺寸', 'sm 尺寸适配紧凑场景。'),
      defineExample('alert-dialog', 'alert-dialog-small-media', '小尺寸媒体', '小尺寸下的媒体布局。'),
      defineExample('alert-dialog', 'alert-dialog-rtl', 'RTL', '在 RTL 页面中保持自然的操作顺序。')
    ],
    variants: 'AlertDialogContent size 支持 default 与 sm。',
    api: [
      { name: 'AlertDialog v-model:open', type: 'boolean', defaultValue: 'undefined', description: '对话框的受控打开状态。' },
      { name: 'AlertDialog defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控对话框的初始状态。' },
      { name: 'AlertDialogContent size', type: '\'default\' | \'sm\'', defaultValue: '\'default\'', description: '对话框尺寸。' },
      { name: 'AlertDialogContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到对话框内容的调用方类。' },
      { name: 'AlertDialogHeader as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '页眉的元素组合能力。' },
      { name: 'AlertDialogFooter as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '页脚的元素组合能力。' },
      { name: 'AlertDialogMedia as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '媒体区域的元素组合能力。' }
    ],
    accessibility: { description: 'AlertDialog 复用 Reka UI Dialog 的焦点管理、Escape 关闭、遮罩交互和焦点归还。Content 内应提供 AlertDialogTitle，以及可选的 AlertDialogDescription 为屏幕阅读器提供上下文。' }
  },
  'command': {
    importCode: 'import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from \'moriui\'',
    resources: componentResources('command'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Command 基于 Reka Combobox 构建，使用 Input、List、Group、Item、Empty 与 Separator 组合快速命令面板。', shadcnHeading: 'Composition' },
      { id: '对话框模式', title: '对话框模式', description: 'CommandDialog 将命令面板包裹在模态 Dialog 中，适合全局快捷键唤醒的搜索场景。', shadcnHeading: 'Dialog' },
      { id: '分组', title: '分组', description: 'CommandGroup 通过 heading 属性提供标题，CommandSeparator 在组间建立视觉边界。', shadcnHeading: 'Groups' },
      { id: 'RTL', title: 'RTL', description: '搜索输入与项目列表沿 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('command', 'command-demo', '概览', '可搜索的命令面板。'),
      defineExample('command', 'command-basic', '基础', '最小化的命令列表。'),
      defineExample('command', 'command-dialog', '对话框', 'CommandDialog 将命令面板置于模态内。'),
      defineExample('command', 'command-groups', '分组', 'Group 与 Separator 组织命令类别。'),
      defineExample('command', 'command-scrollable', '可滚动', '长列表在 CommandList 中滚动。'),
      defineExample('command', 'command-shortcuts', '快捷键', 'CommandShortcut 显示键位提示。'),
      defineExample('command', 'command-rtl', 'RTL', '命令面板在 RTL 页面中工作。')
    ],
    variants: 'Command 没有公开视觉变体；打开、高亮与选中状态由 Reka Combobox 属性驱动。',
    api: [
      { name: 'Command v-model', type: 'AcceptableValue | AcceptableValue[]', defaultValue: 'undefined', description: '单选或多选值。' },
      { name: 'Command multiple / disabled', type: 'boolean', defaultValue: 'false', description: '多选模式与整体禁用。' },
      { name: 'Command ignoreFilter', type: 'boolean', defaultValue: 'false', description: '关闭内置筛选，由调用方控制。' },
      { name: 'CommandInput v-model', type: 'string', defaultValue: '\'\'', description: '搜索输入值。' },
      { name: 'CommandInput placeholder', type: 'string', defaultValue: '\'输入命令或搜索…\'', description: '输入占位提示。' },
      { name: 'CommandDialog v-model:open', type: 'boolean', defaultValue: 'undefined', description: '对话框的受控打开状态。' },
      { name: 'CommandDialog title', type: 'string', defaultValue: '\'命令面板\'', description: '对话框标题。' },
      { name: 'CommandDialog description', type: 'string', defaultValue: '\'搜索并执行命令。\'', description: '对话框辅助说明。' },
      { name: 'CommandGroup heading', type: 'string', defaultValue: 'undefined', description: '分组标题。' },
      { name: 'CommandItem value', type: 'AcceptableValue', defaultValue: '—', description: '必填的项目值。' }
    ],
    accessibility: { description: 'Command 复用 Reka Combobox 的 combobox/listbox ARIA、方向键导航、Enter 选择与筛选。CommandDialog 额外使用 Dialog 的焦点管理。' }
  },
  'context-menu': {
    importCode: 'import { ContextMenu, ContextMenuArrow, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuItemIndicator, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from \'moriui\'',
    resources: componentResources('context-menu'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'ContextMenu 由 Trigger、Content、Item、Separator、Group、Label 与 Sub 组成，CheckboxItem 和 RadioItem 支持选择和设置。', shadcnHeading: 'Composition' },
      { id: '子菜单', title: '子菜单', description: 'Sub、SubTrigger 与 SubContent 构建多级嵌套菜单。', shadcnHeading: 'Submenus' },
      { id: '复选与单选', title: '复选与单选', description: 'CheckboxItem 和 RadioItem 使用 Indicator 表达选中状态；RadioGroup 管理单项选择。', shadcnHeading: 'Checkbox and Radio Items' },
      { id: 'RTL', title: 'RTL', description: 'dir 控制弹层定位与方向键行为。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('context-menu', 'context-menu-demo', '概览', '右键菜单展示上下文操作。'),
      defineExample('context-menu', 'context-menu-basic', '基础', '最小化的菜单内容。'),
      defineExample('context-menu', 'context-menu-icons', '图标', '为菜单项添加图标。'),
      defineExample('context-menu', 'context-menu-checkboxes', '复选项', 'CheckboxItem 支持多选状态。'),
      defineExample('context-menu', 'context-menu-radio', '单选项', 'RadioItem 与 RadioGroup 管理唯一选择。'),
      defineExample('context-menu', 'context-menu-groups', '分组', 'Group 与 Label 组织菜单层级。'),
      defineExample('context-menu', 'context-menu-shortcuts', '快捷键', 'Shortcut 展示菜单项的键位提示。'),
      defineExample('context-menu', 'context-menu-submenu', '子菜单', 'Sub、SubTrigger 与 SubContent 构建多级菜单。'),
      defineExample('context-menu', 'context-menu-destructive', '破坏性', '使用样式区分危险操作。'),
      defineExample('context-menu', 'context-menu-sides', '定位', 'Content 的 side 控制弹出方向。'),
      defineExample('context-menu', 'context-menu-rtl', 'RTL', '菜单在 RTL 上下文中的定位。')
    ],
    variants: 'ContextMenuContent 的 side、align 来自 Reka Popper 定位，无公开视觉变体。',
    api: [
      { name: 'ContextMenu v-model:open', type: 'boolean', defaultValue: 'undefined', description: '右键菜单的受控打开状态。' },
      { name: 'ContextMenu defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控初始打开状态。' },
      { name: 'ContextMenuTrigger as / asChild', type: 'string | Component / boolean', defaultValue: '\'span\' / false', description: '右键触发区域的元素组合能力。' },
      { name: 'ContextMenuContent side / align', type: 'PopperContentProps', defaultValue: '\'bottom\' / \'start\'', description: '弹层方向与对齐。' },
      { name: 'ContextMenuItem disabled', type: 'boolean', defaultValue: 'false', description: '禁用菜单项。' },
      { name: 'ContextMenuCheckboxItem v-model', type: 'boolean | \'indeterminate\'', defaultValue: 'undefined', description: '复选框的选中状态。' },
      { name: 'ContextMenuRadioItem value', type: 'AcceptableValue', defaultValue: '—', description: '必填的单选项值。' },
      { name: 'ContextMenuSeparator class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到分隔线的调用方类。' },
      { name: 'ContextMenuLabel class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标签的调用方类。' },
      { name: 'ContextMenuSub v-model:open', type: 'boolean', defaultValue: 'undefined', description: '子菜单的受控打开状态。' },
      { name: 'ContextMenuSubTrigger disabled', type: 'boolean', defaultValue: 'false', description: '禁用子菜单触发器。' },
      { name: 'ContextMenuShortcut class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到快捷键标签的调用方类。' }
    ],
    accessibility: { description: 'ContextMenu 复用 Reka UI 的 menu ARIA、方向键导航、Enter/Space 选择与 Escape 关闭。Trigger 应表示其弹出行为；Content 内需要为 Label 等提供合适的语义。' }
  },
  'drawer': {
    importCode: 'import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHandle, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from \'moriui\'',
    resources: componentResources('drawer'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Drawer 由 Trigger、Portal、Overlay、Content 与 Handle 组成；Content 内可使用 Header、Title、Description 与 Footer 组织结构。', shadcnHeading: 'Composition' },
      { id: '吸附点', title: '吸附点', description: 'snapPoints 设置内容停靠位置；activeSnapPoint 控制当前吸附点，用户拖拽时自动捕捉。', shadcnHeading: 'Snap Points' },
      { id: '拖拽手柄', title: '拖拽手柄', description: 'showHandle 控制交互手柄的显示；DrawerHandle 也可独立使用 Reka Drawer 原语的拖拽行为。', shadcnHeading: 'Swipe Handle' },
      { id: '从各侧滑出', title: '从各侧滑出', description: 'direction 控制抽屉从屏幕的哪一侧滑入，支持 top、right、bottom、left。', shadcnHeading: 'Direction' },
      { id: '非模态', title: '非模态', description: 'modal 控制是否阻止背景交互；非模态时用户可与背景内容交互。', shadcnHeading: 'Non-Modal' },
      { id: 'RTL', title: 'RTL', description: 'direction 的左右逻辑在 RTL 上下文中自然翻转。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('drawer', 'drawer-demo', '概览', '从底部滑出的编辑面板。'),
      defineExample('drawer', 'drawer-sides', '方向', '从各侧滑入。'),
      defineExample('drawer', 'drawer-snap-points', '吸附点', 'snapPoints 控制多级高度位置。'),
      defineExample('drawer', 'drawer-swipe-handle', '拖拽手柄', '手柄区域触发拖拽交互。'),
      defineExample('drawer', 'drawer-non-modal', '非模态', '非模态时背景可交互。'),
      defineExample('drawer', 'drawer-nested', '嵌套', '在 Drawer 内打开另一个 Drawer。'),
      defineExample('drawer', 'drawer-dialog', '对话框', '结合 Dialog 与 Drawer 的响应式模式。'),
      defineExample('drawer', 'drawer-rtl', 'RTL', '在 RTL 页面中保持自然的方向逻辑。')
    ],
    variants: 'Drawer 的 direction 支持 top、right、bottom、left；snapPoints 通过 number[] 定义吸附位置百分比。',
    api: [
      { name: 'Drawer v-model:open', type: 'boolean', defaultValue: 'undefined', description: '抽屉的受控打开状态。' },
      { name: 'Drawer defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控初始打开状态。' },
      { name: 'Drawer direction', type: '\'top\' | \'right\' | \'bottom\' | \'left\'', defaultValue: 'undefined', description: '抽屉从屏幕边缘滑出的方向。' },
      { name: 'Drawer modal', type: 'boolean', defaultValue: 'true', description: '是否阻断背景区域交互。' },
      { name: 'Drawer dismissible', type: 'boolean', defaultValue: 'true', description: '是否点击遮罩或拖拽关闭。' },
      { name: 'Drawer snapPoints', type: 'number[]', defaultValue: 'undefined', description: '可吸附的高度百分比位置。' },
      { name: 'DrawerContent showHandle', type: 'boolean', defaultValue: 'false', description: '是否显示拖拽手柄。' },
      { name: 'DrawerHandle class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到手柄的调用方类。' },
      { name: 'DrawerHeader as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '页眉的元素组合能力。' },
      { name: 'DrawerFooter as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '页脚的元素组合能力。' },
      { name: 'DrawerClose as / asChild', type: 'string | Component / boolean', defaultValue: 'undefined', description: '关闭按钮的元素组合能力。' }
    ],
    accessibility: { description: 'Drawer 复用 Reka UI Dialog 的焦点管理、Escape 关闭、遮罩交互和焦点归还。Content 内应提供 DrawerTitle，需要时提供 DrawerDescription。拖拽交互在触摸设备上需确保有键盘替代方式。' }
  },
  'dropdown-menu': {
    importCode: 'import { DropdownMenu, DropdownMenuArrow, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from \'moriui\'',
    resources: componentResources('dropdown-menu'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'DropdownMenu 由 Trigger、Content、Item、Separator、Group、Label 与 Sub 组成，CheckboxItem 和 RadioItem 提供选择能力。', shadcnHeading: 'Composition' },
      { id: '子菜单', title: '子菜单', description: 'Sub、SubTrigger 与 SubContent 构建多级嵌套菜单。', shadcnHeading: 'Submenus' },
      { id: '复选与单选', title: '复选与单选', description: 'CheckboxItem 和 RadioItem 使用 Indicator 表达选中状态；RadioGroup 管理单项选择。', shadcnHeading: 'Checkbox and Radio Items' },
      { id: 'RTL', title: 'RTL', description: 'dir 控制弹层定位与方向键行为。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('dropdown-menu', 'dropdown-menu-demo', '概览', '账户与设置的下拉菜单。'),
      defineExample('dropdown-menu', 'dropdown-menu-basic', '基础', '最小化的菜单内容。'),
      defineExample('dropdown-menu', 'dropdown-menu-icons', '图标', '为菜单项添加图标。'),
      defineExample('dropdown-menu', 'dropdown-menu-checkboxes', '复选项', 'CheckboxItem 支持多选状态。'),
      defineExample('dropdown-menu', 'dropdown-menu-checkboxes-icons', '图标复选项', '带图标的复选菜单项。'),
      defineExample('dropdown-menu', 'dropdown-menu-radio-group', '单选项', 'RadioItem 与 RadioGroup 管理唯一选择。'),
      defineExample('dropdown-menu', 'dropdown-menu-radio-icons', '图标单选项', '带图标的单选菜单项。'),
      defineExample('dropdown-menu', 'dropdown-menu-shortcuts', '快捷键', 'Shortcut 展示菜单项的键位提示。'),
      defineExample('dropdown-menu', 'dropdown-menu-submenu', '子菜单', 'Sub、SubTrigger 与 SubContent 构建多级菜单。'),
      defineExample('dropdown-menu', 'dropdown-menu-destructive', '破坏性', '使用样式区分危险操作。'),
      defineExample('dropdown-menu', 'dropdown-menu-avatar', '头像', '在 Trigger 中使用头像。'),
      defineExample('dropdown-menu', 'dropdown-menu-complex', '复杂', '组合多种菜单项类型的场景。'),
      defineExample('dropdown-menu', 'dropdown-menu-rtl', 'RTL', '菜单在 RTL 上下文中的定位。')
    ],
    variants: 'DropdownMenuContent 的 side、align 来自 Reka Popper 定位，无公开视觉变体。',
    api: [
      { name: 'DropdownMenu v-model:open', type: 'boolean', defaultValue: 'undefined', description: '菜单的受控打开状态。' },
      { name: 'DropdownMenu defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控初始打开状态。' },
      { name: 'DropdownMenuTrigger as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '触发器的元素组合能力。' },
      { name: 'DropdownMenuContent side / align', type: 'PopperContentProps', defaultValue: '\'bottom\' / \'start\'', description: '弹层方向与对齐。' },
      { name: 'DropdownMenuItem disabled', type: 'boolean', defaultValue: 'false', description: '禁用菜单项。' },
      { name: 'DropdownMenuCheckboxItem v-model', type: 'boolean | \'indeterminate\'', defaultValue: 'undefined', description: '复选框的选中状态。' },
      { name: 'DropdownMenuRadioItem value', type: 'AcceptableValue', defaultValue: '—', description: '必填的单选项值。' },
      { name: 'DropdownMenuRadioGroup v-model', type: 'AcceptableValue', defaultValue: 'undefined', description: '单选组当前值。' },
      { name: 'DropdownMenuSeparator class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到分隔线的调用方类。' },
      { name: 'DropdownMenuLabel class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标签的调用方类。' },
      { name: 'DropdownMenuSub v-model:open', type: 'boolean', defaultValue: 'undefined', description: '子菜单的受控打开状态。' },
      { name: 'DropdownMenuSubTrigger disabled', type: 'boolean', defaultValue: 'false', description: '禁用子菜单触发器。' },
      { name: 'DropdownMenuShortcut class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到快捷键标签的调用方类。' }
    ],
    accessibility: { description: 'DropdownMenu 复用 Reka UI 的 menu ARIA、方向键导航、Enter/Space 选择与 Escape 关闭。Trigger 应有 aria-haspopup；Content 内需要为 Label 等提供合适的语义。' }
  },
  'hover-card': {
    importCode: 'import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardTrigger } from \'moriui\'',
    resources: componentResources('hover-card'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'HoverCard 由 Trigger、Portal、Content 与可选 Arrow 组成；通过鼠标悬浮或焦点触发。', shadcnHeading: 'Composition' },
      { id: '定位', title: '定位', description: 'Content 的 side 与 align 控制弹出卡片的方向和对齐。', shadcnHeading: 'Sides' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('hover-card', 'hover-card-demo', '概览', '悬浮在日历时查看详情。'),
      defineExample('hover-card', 'hover-card-sides', '定位', '使用 side 控制卡片弹出方向。'),
      defineExample('hover-card', 'hover-card-rtl', 'RTL', '从右到左的悬浮卡片布局。')
    ],
    variants: 'HoverCardContent 的 side 与 align 来自 Reka Popper 定位。',
    api: [
      { name: 'HoverCard v-model:open', type: 'boolean', defaultValue: 'undefined', description: '悬浮卡的受控打开状态。' },
      { name: 'HoverCard defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控初始打开状态。' },
      { name: 'HoverCard openDelay', type: 'number', defaultValue: '300', description: '悬浮后打开延迟的毫秒数。' },
      { name: 'HoverCard closeDelay', type: 'number', defaultValue: '300', description: '离开后关闭延迟的毫秒数。' },
      { name: 'HoverCardContent side / align', type: 'PopperContentProps', defaultValue: '\'bottom\' / \'center\'', description: '卡片方向与对齐。' },
      { name: 'HoverCardContent sideOffset', type: 'number', defaultValue: '4', description: '卡片与触发器的偏移像素。' },
      { name: 'HoverCardArrow width / height', type: 'number', defaultValue: '10 / 5', description: '箭头的宽度与高度。' }
    ],
    accessibility: { description: 'HoverCard 复用 Reka UI Popper 的悬浮触发，并支持键盘焦点触发。Content 内的交互元素键盘用户可通过 Tab 进入；隐藏时不应保留可聚焦元素。' }
  },
  'sheet': {
    importCode: 'import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger } from \'moriui\'',
    resources: componentResources('sheet'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Sheet 由 Trigger 和 Content 组成；Content 内可使用 Header、Title、Description 与 Footer 组织结构。', shadcnHeading: 'Composition' },
      { id: '位置', title: '位置', description: 'side 控制面板从屏幕边缘滑出的方向，支持 top、right、bottom、left。', shadcnHeading: 'Side' },
      { id: '无关闭按钮', title: '无关闭按钮', description: 'showCloseButton 控制默认关闭控件的显示。', shadcnHeading: 'No Close Button' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('sheet', 'sheet-demo', '概览', '编辑资料的侧边面板。'),
      defineExample('sheet', 'sheet-side', '位置', '使用 side 控制面板从屏幕边缘滑出。'),
      defineExample('sheet', 'sheet-no-close-button', '无关闭按钮', '隐藏默认关闭按钮。'),
      defineExample('sheet', 'sheet-rtl', 'RTL', '从右到左的面板布局。')
    ],
    variants: 'SheetContent 的 side 支持 top、right、bottom、left。',
    api: [
      { name: 'Sheet v-model:open', type: 'boolean', defaultValue: 'undefined', description: '面板的受控打开状态。' },
      { name: 'Sheet defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控初始打开状态。' },
      { name: 'SheetContent side', type: '\'top\' | \'right\' | \'bottom\' | \'left\'', defaultValue: '\'right\'', description: '面板从屏幕边缘滑出的方向。' },
      { name: 'SheetContent showCloseButton', type: 'boolean', defaultValue: 'true', description: '是否显示默认关闭按钮。' },
      { name: 'SheetClose as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '关闭触发器的元素组合能力。' },
      { name: 'SheetHeader class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到面板头部的调用方类。' },
      { name: 'SheetFooter class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到面板脚部的调用方类。' }
    ],
    accessibility: { description: 'Sheet 复用 Reka UI Dialog 的焦点管理、Escape 关闭、遮罩交互和焦点归还。Content 内应提供 SheetTitle，并在需要时提供 SheetDescription。' }
  },
  'tooltip': {
    importCode: 'import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from \'moriui\'',
    resources: componentResources('tooltip'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Tooltip 由 Provider、Trigger、Portal、Content 与可选 Arrow 组成；Provider 统一配置组件的打开延迟与关闭行为。', shadcnHeading: 'Composition' },
      { id: '定位', title: '定位', description: 'Content 的 side 与 sideOffset 控制提示文本的方向和间距。', shadcnHeading: 'Sides' },
      { id: '禁用状态', title: '禁用状态', description: 'TooltipProvider 的 disableHoverableContent 可关闭内容的悬浮保持行为。', shadcnHeading: 'Disabled' },
      { id: '键盘', title: '键盘', description: 'Tooltip 通过焦点触发，支持键盘用户在焦点可见时查看提示。', shadcnHeading: 'Keyboard' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('tooltip', 'tooltip-demo', '概览', '保存按钮的提示文本。'),
      defineExample('tooltip', 'tooltip-sides', '定位', '使用 side 控制提示出现的方位。'),
      defineExample('tooltip', 'tooltip-disabled', '禁用', '禁用按钮仍然触发提示。'),
      defineExample('tooltip', 'tooltip-keyboard', '键盘', '键盘焦点也能触发工具提示。'),
      defineExample('tooltip', 'tooltip-rtl', 'RTL', '从右到左的提示布局。')
    ],
    variants: 'Tooltip 没有公开视觉变体；side 与 sideOffset 来自 Reka Popper 定位属性。',
    api: [
      { name: 'Tooltip v-model:open', type: 'boolean', defaultValue: 'undefined', description: '提示的受控打开状态。' },
      { name: 'Tooltip defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控初始打开状态。' },
      { name: 'TooltipProvider delayDuration', type: 'number', defaultValue: '300', description: '触发打开前的延迟毫秒数。' },
      { name: 'TooltipProvider disableHoverableContent', type: 'boolean', defaultValue: 'false', description: '关闭鼠标悬浮在内容上时的保持打开行为。' },
      { name: 'TooltipProvider skipDelayDuration', type: 'number', defaultValue: '300', description: '工具提示切换之间的跳过延迟。' },
      { name: 'TooltipContent side / align', type: 'PopperContentProps', defaultValue: '\'top\' / \'center\'', description: '提示方向与对齐。' },
      { name: 'TooltipContent sideOffset', type: 'number', defaultValue: '4', description: '提示与触发器的偏移像素。' },
      { name: 'TooltipArrow width / height', type: 'number', defaultValue: '10 / 5', description: '箭头的宽度与高度。' }
    ],
    accessibility: { description: 'Tooltip 复用 Reka UI 的 tooltip 角色，触发元素需要描述性文本；纯图标按钮的 Tooltip 应配合 aria-label。Tooltip 本身不应包含交互元素。' }
  },
  ...controlReferences,
  'accordion': {
    importCode: 'import { Accordion, AccordionContent, AccordionIcon, AccordionItem, AccordionTrigger } from \'moriui\'',
    resources: componentResources('accordion'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Accordion 基于 Reka UI 构建，由 Item、Trigger 和 Content 组成；AccordionIcon 提供默认展开指示图标。', shadcnHeading: 'Composition' },
      { id: '多项展开', title: '多项展开', description: '添加 multiple 属性可同时展开多个项目。', shadcnHeading: 'Multiple' },
      { id: '禁用项目', title: '禁用项目', description: 'AccordionItem 支持 disabled 属性，禁用后无法展开。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: 'Accordion 内容沿外围 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('accordion', 'accordion-demo', '概览', '常见问答的折叠面板。'),
      defineExample('accordion', 'accordion-basic', '基础', '单项目展开的折叠面板。'),
      defineExample('accordion', 'accordion-multiple', '多项展开', '同时展开多个项目。'),
      defineExample('accordion', 'accordion-disabled', '禁用', '禁用单个项目。'),
      defineExample('accordion', 'accordion-borders', '边框', '带边框的折叠面板。'),
      defineExample('accordion', 'accordion-card', '卡片', '包含在 Card 中的折叠面板。'),
      defineExample('accordion', 'accordion-rtl', 'RTL', '从右到左的折叠面板。')
    ],
    variants: 'Accordion 没有视觉变体；multiple、disabled 由 Reka UI 属性驱动。',
    api: [
      { name: 'Accordion v-model', type: 'string | string[]', defaultValue: 'undefined', description: '当前展开项的值（single）或值数组（multiple）。' },
      { name: 'Accordion defaultValue', type: 'string | string[]', defaultValue: 'undefined', description: '非受控展开项的初始值。' },
      { name: 'Accordion multiple', type: 'boolean', defaultValue: 'false', description: '允许多项同时展开。' },
      { name: 'AccordionItem value', type: 'string', defaultValue: '—', description: '必填，唯一标识该项目。' },
      { name: 'AccordionItem disabled', type: 'boolean', defaultValue: 'false', description: '禁用该项目。' },
      { name: 'AccordionTrigger class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到触发器的调用方类。' },
      { name: 'AccordionContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到内容区域的调用方类。' },
      { name: 'AccordionIcon class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到展开图标的调用方类。' },
      { name: 'Accordion as / asChild', type: 'string | Component / boolean', defaultValue: '\'div\' / false', description: '来自 Reka Primitive 的元素组合能力。' }
    ],
    accessibility: { description: 'Accordion 复用 Reka UI 的 Accordion ARIA，包括区域角色、方向键导航、Enter/Space 展开收起和 aria-expanded。Trigger 应包含清晰的标题文本。' }
  },
  'breadcrumb': {
    importCode: 'import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from \'moriui\'',
    resources: componentResources('breadcrumb'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Breadcrumb 通过 List 组织 Item，Item 内为 Link 或 Page 表示当前页；Separator 和 Ellipsis 分别处理分隔与折叠。', shadcnHeading: 'Composition' },
      { id: '自定义分隔符', title: '自定义分隔符', description: 'BreadcrumbSeparator 的默认插槽可替换为任意分隔图标。', shadcnHeading: 'Custom Separator' },
      { id: '省略菜单', title: '省略菜单', description: 'BreadcrumbEllipsis 可配合 DropdownMenu 展开被折叠的路径。', shadcnHeading: 'Ellipsis' },
      { id: 'RTL', title: 'RTL', description: '面包屑沿 dir 逻辑方向排列，分隔符方向随之调整。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('breadcrumb', 'breadcrumb-demo', '概览', '面包屑导航展示页面层级。'),
      defineExample('breadcrumb', 'breadcrumb-basic', '基础', '简单的路径导航链接。'),
      defineExample('breadcrumb', 'breadcrumb-separator', '自定义分隔符', '替换默认分隔图标。'),
      defineExample('breadcrumb', 'breadcrumb-link', '链接', '使用 BreadcrumbLink 构建导航。'),
      defineExample('breadcrumb', 'breadcrumb-ellipsis', '省略', '使用 BreadcrumbEllipsis 折叠长路径。'),
      defineExample('breadcrumb', 'breadcrumb-dropdown', '菜单', 'Ellipsis 配合 DropdownMenu 展开路径。'),
      defineExample('breadcrumb', 'breadcrumb-rtl', 'RTL', '从右到左的面包屑导航。')
    ],
    variants: 'Breadcrumb 没有视觉变体；各子组件通过 class 自定义间距和颜色。',
    api: [
      { name: 'BreadcrumbList class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到列表容器的调用方类。' },
      { name: 'BreadcrumbItem class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到列表项的调用方类。' },
      { name: 'BreadcrumbLink href', type: 'string', defaultValue: '—', description: '导航链接目标地址。' },
      { name: 'BreadcrumbLink as / asChild', type: 'string | Component / boolean', defaultValue: '\'a\' / false', description: '渲染为其他路由组件。' },
      { name: 'BreadcrumbPage class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '表示当前页的文字。' },
      { name: 'BreadcrumbSeparator class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到分隔符的调用方类。' },
      { name: 'BreadcrumbEllipsis class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到省略按钮的调用方类。' }
    ],
    accessibility: { description: 'Breadcrumb 默认输出 role="navigation" 和 aria-label="Breadcrumb"，列表使用 role="list" 和 role="listitem"。当前页使用 BreadcrumbPage 且 aria-current="page"。链接有清晰目的名称。' }
  },
  'calendar': {
    importCode: 'import { Calendar } from \'moriui\'',
    resources: componentResources('calendar'),
    states: [
      { id: '选择模式', title: '选择模式', description: 'Calendar 通过 multiple 属性控制单选或多选；day 插槽可自定义日期格内容。', shadcnHeading: 'Mode' },
      { id: '自定义标题', title: '自定义标题', description: 'heading 插槽替换默认月份/年份标题。', shadcnHeading: 'Caption' },
      { id: '自定义日期格', title: '自定义日期格', description: 'day 插槽接收 dayValue/disabled/today/selected 属性，支持自定义渲染。', shadcnHeading: 'Custom Days' },
      { id: 'RTL', title: 'RTL', description: '日历网格和方向键遵循 dir。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('calendar', 'calendar-demo', '概览', '单日日期选择。'),
      defineExample('calendar', 'calendar-basic', '基础', '最小化的日历。'),
      defineExample('calendar', 'calendar-multiple', '多选', '多次日期选择。'),
      defineExample('calendar', 'calendar-range', '范围', '选择日期区间。'),
      defineExample('calendar', 'calendar-presets', '预设', '快捷预设日期。'),
      defineExample('calendar', 'calendar-time', '时间', '日期时间选择。'),
      defineExample('calendar', 'calendar-caption', '标题', '自定义月份标题。'),
      defineExample('calendar', 'calendar-custom-days', '自定义日期', '在日期格中展示额外信息。'),
      defineExample('calendar', 'calendar-week-numbers', '周数', '左侧显示周数。'),
      defineExample('calendar', 'calendar-rtl', 'RTL', '从右到左的日历布局。')
    ],
    variants: 'Calendar 没有视觉变体；multiple 控制多选，通过 Reka UI DateField 管理日期状态。',
    api: [
      { name: 'Calendar v-model', type: 'DateValue | DateValue[] | null', defaultValue: 'undefined', description: '当前选择的日期。' },
      { name: 'Calendar multiple', type: 'boolean', defaultValue: 'false', description: '允许多选。' },
      { name: 'Calendar placeholder', type: 'DateValue', defaultValue: '今天', description: '日历初始聚焦月份。' },
      { name: 'Calendar numberOfMonths', type: 'number', defaultValue: '1', description: '同时显示的月份数量。' },
      { name: 'Calendar locale', type: 'string', defaultValue: '\'en\'', description: '日历的语言区域。' }
    ],
    accessibility: { description: 'Calendar 复用 Reka UI Calendar 的 grid ARIA、方向键导航。每个日期格有正确标签。' }
  },
  'collapsible': {
    importCode: 'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from \'moriui\'',
    resources: componentResources('collapsible'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Collapsible 由 Trigger 和 Content 组成，通过 v-model:open 控制展开状态。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: 'Collapsible 内容沿外围 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('collapsible', 'collapsible-demo', '概览', '展开或收起订单详情。'),
      defineExample('collapsible', 'collapsible-basic', '基础', '最小化的展开收起。'),
      defineExample('collapsible', 'collapsible-file-tree', '文件目录', '嵌套 Collapsible 展示目录结构。'),
      defineExample('collapsible', 'collapsible-settings', '设置面板', '分组设置项展开。'),
      defineExample('collapsible', 'collapsible-rtl', 'RTL', '从右到左的折叠面板。')
    ],
    variants: 'Collapsible 没有视觉变体；open/closed 状态由 Reka UI 的 data-state 驱动。',
    api: [
      { name: 'Collapsible v-model:open', type: 'boolean', defaultValue: 'undefined', description: '受控展开状态。' },
      { name: 'Collapsible defaultOpen', type: 'boolean', defaultValue: 'false', description: '非受控初始展开状态。' },
      { name: 'Collapsible disabled', type: 'boolean', defaultValue: 'false', description: '禁用交互。' },
      { name: 'CollapsibleTrigger as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '触发器的元素组合能力。' },
      { name: 'CollapsibleContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到内容区的调用方类。' }
    ],
    accessibility: { description: 'Collapsible 复用 Reka UI Collapsible 的 button 和 region 角色、aria-expanded、aria-controls 和隐藏内容管理。Trigger 应提供清晰可理解的控制标签。' }
  },
  'date-picker': {
    importCode: 'import { DatePicker } from \'moriui\'',
    resources: componentResources('date-picker'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'DatePicker 组合 Calendar 和 Popover，通过 Trigger 打开日历弹层。', shadcnHeading: 'Composition' },
      { id: '预设', title: '预设', description: '与日历 preset 组合可提供快捷日期范围。', shadcnHeading: 'Presets' },
      { id: 'RTL', title: 'RTL', description: '弹层定位与日历方向遵循 dir。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('date-picker', 'date-picker-demo', '概览', '从弹层中选择日期。'),
      defineExample('date-picker', 'date-picker-basic', '基础', '最小化的日期选择。'),
      defineExample('date-picker', 'date-picker-range', '范围', '选择日期区间。'),
      defineExample('date-picker', 'date-picker-input', '输入', '手动输入日期。'),
      defineExample('date-picker', 'date-picker-dob', '生日', '选择出生日期。'),
      defineExample('date-picker', 'date-picker-time', '时间', '日期时间选择。'),
      defineExample('date-picker', 'date-picker-natural-language', '自然语言', '自然语言输入日期。'),
      defineExample('date-picker', 'date-picker-rtl', 'RTL', '从右到左的日期选择。')
    ],
    variants: 'DatePicker 没有视觉变体；弹层定位由 Popper 控制。',
    api: [
      { name: 'DatePicker v-model', type: 'DateValue | null', defaultValue: 'undefined', description: '当前选中日期。' },
      { name: 'DatePicker placeholder', type: 'DateValue', defaultValue: 'undefined', description: '无选择时的占位日期。' },
      { name: 'DatePickerInput class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到输入框的调用方类。' },
      { name: 'DatePickerContent side / align', type: 'PopperContentProps', defaultValue: '\'bottom\' / \'center\'', description: '弹层定位属性。' }
    ],
    accessibility: { description: 'DatePicker 将 Calendar 的 grid 语义放置在 Popover 弹层中，焦点在打开时移动到日历。输入框应有 Label 或 aria-label。' }
  },
  'date-range-picker': {
    importCode: 'import { DateRangePicker } from \'moriui\'',
    resources: componentResources('date-range-picker'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'DateRangePicker 为日期区间选择的包装组件，提供起止日期双输入。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('date-range-picker', 'date-range-picker-demo', '概览', '选择日期区间。'),
      defineExample('date-range-picker', 'date-range-picker-basic', '基础', '最小化区间选择。'),
      defineExample('date-range-picker', 'date-range-picker-presets', '预设', '快捷预设日期范围。'),
      defineExample('date-range-picker', 'date-range-picker-rtl', 'RTL', '从右到左的日期区间选择。')
    ],
    variants: 'DateRangePicker 没有视觉变体；弹层定位由 Popper 控制。',
    api: [
      { name: 'DateRangePicker v-model', type: '{ start: DateValue | null, end: DateValue | null }', defaultValue: 'undefined', description: '起止日期对象。' },
      { name: 'DateRangePicker placeholder', type: 'DateValue', defaultValue: 'undefined', description: '无选择时的占位月份。' }
    ],
    accessibility: { description: 'DateRangePicker 将 Calendar range 模式与双输入字段组合。输入应有各自的 Label 或 aria-label。' }
  },
  'menubar': {
    importCode: 'import { Menubar, MenubarArrow, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarItemIndicator, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from \'moriui\'',
    resources: componentResources('menubar'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Menubar 由 Menu、Trigger 和 Content 组成，支持 Item、CheckboxItem、RadioItem、Separator、Label、Sub 和 Shortcut。', shadcnHeading: 'Composition' },
      { id: '子菜单', title: '子菜单', description: 'Sub、SubTrigger 与 SubContent 构建多级嵌套菜单。', shadcnHeading: 'Submenus' },
      { id: '复选与单选', title: '复选与单选', description: 'CheckboxItem 和 RadioItem 使用 Indicator 表达选中状态；RadioGroup 管理单项选择。', shadcnHeading: 'Checkbox and Radio Items' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('menubar', 'menubar-demo', '概览', '应用菜单栏展示菜单层级。'),
      defineExample('menubar', 'menubar-icons', '图标', '为菜单项添加图标。'),
      defineExample('menubar', 'menubar-checkbox', '复选项', 'CheckboxItem 支持多选状态。'),
      defineExample('menubar', 'menubar-radio', '单选项', 'RadioItem 与 RadioGroup 管理唯一选择。'),
      defineExample('menubar', 'menubar-submenu', '子菜单', 'Sub、SubTrigger 与 SubContent 构建多级菜单。'),
      defineExample('menubar', 'menubar-rtl', 'RTL', '菜单在 RTL 上下文中的定位。')
    ],
    variants: 'MenubarContent 的 side、align 来自 Reka Popper 定位，无公开视觉变体。',
    api: [
      { name: 'MenubarMenu value', type: 'string', defaultValue: '—', description: '菜单项唯一标识。' },
      { name: 'MenubarTrigger as / asChild', type: 'string | Component / boolean', defaultValue: '\'button\' / false', description: '触发器的元素组合能力。' },
      { name: 'MenubarItem disabled', type: 'boolean', defaultValue: 'false', description: '禁用菜单项。' },
      { name: 'MenubarCheckboxItem v-model', type: 'boolean | \'indeterminate\'', defaultValue: 'undefined', description: '复选框的选中状态。' },
      { name: 'MenubarRadioItem value', type: 'AcceptableValue', defaultValue: '—', description: '必填的单选项值。' },
      { name: 'MenubarRadioGroup v-model', type: 'AcceptableValue', defaultValue: 'undefined', description: '单选组当前值。' },
      { name: 'MenubarSeparator class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到分隔线的调用方类。' },
      { name: 'MenubarLabel class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标签的调用方类。' },
      { name: 'MenubarSub v-model:open', type: 'boolean', defaultValue: 'undefined', description: '子菜单的受控打开状态。' },
      { name: 'MenubarShortcut class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到快捷键标签的调用方类。' }
    ],
    accessibility: { description: 'Menubar 复用 Reka UI 的 menubar/menu ARIA、方向键导航、Enter/Space 选择与 Escape 关闭。Trigger 应有 aria-haspopup；Root 应有 aria-label。' }
  },
  'navigation-menu': {
    importCode: 'import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuSub, NavigationMenuTrigger, NavigationMenuViewport } from \'moriui\'',
    resources: componentResources('navigation-menu'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'NavigationMenu 由 List、Item、Trigger 和 Content 组成，Viewport 管理弹出内容的定位。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('navigation-menu', 'navigation-menu-demo', '概览', '站点主导航菜单。'),
      defineExample('navigation-menu', 'navigation-menu-rtl', 'RTL', '从右到左的导航菜单。')
    ],
    variants: 'NavigationMenu 没有视觉变体；viewport 定位由 Reka UI NavigationMenu 管理。',
    api: [
      { name: 'NavigationMenu v-model:modelValue', type: 'string', defaultValue: 'undefined', description: '当前激活菜单项的值。' },
      { name: 'NavigationMenu defaultValue', type: 'string', defaultValue: 'undefined', description: '非受控初始激活项。' },
      { name: 'NavigationMenu delayDuration', type: 'number', defaultValue: '200', description: '延迟打开/关闭的毫秒数。' },
      { name: 'NavigationMenuList class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到列表的调用方类。' },
      { name: 'NavigationMenuTrigger disabled', type: 'boolean', defaultValue: 'false', description: '禁用触发器。' },
      { name: 'NavigationMenuLink as / asChild', type: 'string | Component / boolean', defaultValue: '\'a\' / false', description: '链接的元素组合能力。' },
      { name: 'NavigationMenuLink active', type: 'boolean', defaultValue: 'false', description: '标记当前激活的导航链接。' },
      { name: 'NavigationMenuViewport class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到视口容器的调用方类。' }
    ],
    accessibility: { description: 'NavigationMenu 复用 Reka UI 的 navigation/menubar ARIA 和键盘导航。Root 元素默认输出 role="navigation"；Trigger 和 Content 自动关联。' }
  },
  'pagination': {
    importCode: 'import { Pagination, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationList, PaginationNext, PaginationPrev } from \'moriui\'',
    resources: componentResources('pagination'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Pagination 通过 List 组织 Item，Item 包含页码，可选 Ellipsis、First、Last、Prev、Next 等导航子组件。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('pagination', 'pagination-demo', '概览', '页码导航与上一页/下一页。'),
      defineExample('pagination', 'pagination-simple', '简洁', '仅上一页/下一页。'),
      defineExample('pagination', 'pagination-icons-only', '仅图标', '仅图标的分页按钮。'),
      defineExample('pagination', 'pagination-rtl', 'RTL', '从右到左的分页导航。')
    ],
    variants: 'Pagination 没有视觉变体；当前页码通过 Reka UI 自动管理。',
    api: [
      { name: 'PaginationList class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到页码列表的调用方类。' },
      { name: 'PaginationItem class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到页码项的调用方类。' },
      { name: 'PaginationPrev / Next href', type: 'string', defaultValue: 'undefined', description: '导航按钮的链接地址。' },
      { name: 'PaginationEllipsis class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到省略号的调用方类。' }
    ],
    accessibility: { description: 'Pagination 默认输出 role="navigation" 和 aria-label="Pagination"。列表使用 role="list"，当前页使用 aria-current="page"。导航按钮图标应提供 aria-label。' }
  },
  'tabs': {
    importCode: 'import { Tabs, TabsContent, TabsList, TabsTrigger } from \'moriui\'',
    resources: componentResources('tabs'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Tabs 由 List、Trigger 和 Content 组成；List 内 Trigger 控制对应 Content 的显示。', shadcnHeading: 'Composition' },
      { id: '线条变体', title: '线条变体', description: 'TabsList 的 variant="line" 切换为下划线指示器样式。', shadcnHeading: 'Line' },
      { id: '垂直方向', title: '垂直方向', description: 'orientation="vertical" 使标签垂直排列。', shadcnHeading: 'Vertical' },
      { id: '禁用标签', title: '禁用标签', description: 'TabsTrigger 支持 disabled 属性。', shadcnHeading: 'Disabled' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('tabs', 'tabs-demo', '概览', '标签切换展示不同内容。'),
      defineExample('tabs', 'tabs-line', '线条', '使用 variant="line" 线条样式。'),
      defineExample('tabs', 'tabs-vertical', '垂直', '纵向排列的标签。'),
      defineExample('tabs', 'tabs-disabled', '禁用', '禁用某个标签。'),
      defineExample('tabs', 'tabs-icons', '图标', '标签带图标。'),
      defineExample('tabs', 'tabs-rtl', 'RTL', '从右到左的标签布局。')
    ],
    variants: 'TabsList 的 variant 支持 default 与 line；orientation 支持 horizontal 与 vertical。',
    api: [
      { name: 'Tabs v-model', type: 'string', defaultValue: 'undefined', description: '当前激活标签的值。' },
      { name: 'Tabs defaultValue', type: 'string', defaultValue: 'undefined', description: '非受控初始激活标签。' },
      { name: 'Tabs orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '标签排列方向。' },
      { name: 'Tabs activationMode', type: '\'automatic\' | \'manual\'', defaultValue: '\'automatic\'', description: '标签激活方式（自动/手动）。' },
      { name: 'TabsList variant', type: '\'default\' | \'line\'', defaultValue: '\'default\'', description: '标签栏视觉变体。' },
      { name: 'TabsList class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标签栏的调用方类。' },
      { name: 'TabsTrigger value', type: 'string', defaultValue: '—', description: '必填，关联的标签值。' },
      { name: 'TabsTrigger disabled', type: 'boolean', defaultValue: 'false', description: '禁用此标签。' },
      { name: 'TabsContent value', type: 'string', defaultValue: '—', description: '必填，关联的标签值。' },
      { name: 'TabsContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到内容区域的调用方类。' }
    ],
    accessibility: { description: 'Tabs 复用 Reka UI 的 tablist/tab/tabpanel ARIA、方向键导航和 aria-selected/aria-controls。TabTrigger 应提供清晰标签。' }
  },
  'carousel': {
    importCode: 'import { Carousel, CarouselAutoplay, CarouselContent, CarouselIndicator, CarouselIndicators, CarouselItem, CarouselNext, CarouselPrevious } from \'moriui\'',
    resources: componentResources('carousel'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Carousel 由 Content、Item、Previous、Next、Indicators 和 Autoplay 组成，支持多种布局配置。', shadcnHeading: 'Composition' },
      { id: '方向', title: '方向', description: 'orientation 支持 horizontal 与 vertical。', shadcnHeading: 'Orientation' },
      { id: '间距', title: '间距', description: '通过 class 中的 gap 控制项目间距。', shadcnHeading: 'Spacing' },
      { id: '插件', title: '插件', description: 'CarouselAutoplay 插件可开启自动轮播。', shadcnHeading: 'Plugin' },
      { id: 'RTL', title: 'RTL', description: '方向由 DirectionProvider 控制。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('carousel', 'carousel-demo', '概览', '图片卡片的横向轮播。'),
      defineExample('carousel', 'carousel-size', '尺寸', '不同尺寸的轮播项目。'),
      defineExample('carousel', 'carousel-orientation', '方向', '垂直方向的轮播。'),
      defineExample('carousel', 'carousel-multiple', '多项目', '同时显示多个项目。'),
      defineExample('carousel', 'carousel-spacing', '间距', '自定义项目间距。'),
      defineExample('carousel', 'carousel-plugin', '自动播放', 'CarouselAutoplay 插件。'),
      defineExample('carousel', 'carousel-rtl', 'RTL', '从右到左的轮播方向。')
    ],
    variants: 'Carousel 的 orientation 支持 horizontal/vertical；opts 支持 slidesToShow、loop、align 等 Embla 选项。',
    api: [
      { name: 'Carousel orientation', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '轮播滚动方向。' },
      { name: 'Carousel opts', type: 'CarouselOptions', defaultValue: '{ loop: false }', description: 'Embla Carousel 配置项。' },
      { name: 'Carousel plugins', type: 'CarouselPlugin[]', defaultValue: '[]', description: 'Embla 插件数组。' },
      { name: 'CarouselContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到内容容器的调用方类。' },
      { name: 'CarouselItem class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到每个项目的调用方类。' },
      { name: 'CarouselPrevious class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到上一页按钮的调用方类。' },
      { name: 'CarouselNext class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到下一页按钮的调用方类。' },
      { name: 'useCarousel()', type: 'CarouselApi', defaultValue: '—', description: '获取轮播 API 实例进行受控操作。' }
    ],
    accessibility: { description: 'Carousel 使用 Embla 的区域和 ARIA 属性。Previous/Next 按钮应提供 aria-label。当前状态可通过 Indicators 展示。' }
  },
  'chart': {
    importCode: 'import { ChartContainer, ChartLegendContent, ChartTooltipContent } from \'moriui\'',
    resources: componentResources('chart'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Chart 基于 Unovis 构建，使用 ChartContainer 包裹 Vis 图表组件，通过 ChartTooltipContent 和 ChartLegendContent 提供交互辅助。', shadcnHeading: 'Composition' },
      { id: 'RTL', title: 'RTL', description: '图表坐标轴在 RTL 页面中自动翻转。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('chart', 'chart-demo', '概览', '柱状图展示数据。'),
      defineExample('chart', 'chart-example-tooltip', '提示框', '图表数据点提示。'),
      defineExample('chart', 'chart-example-legend', '图例', '图表系列图例。'),
      defineExample('chart', 'chart-rtl', 'RTL', '从右到左的图表布局。')
    ],
    variants: 'Chart 没有视觉变体；使用不同 Vis 组件（VisBar、VisLine、VisArea 等）表达数据。',
    api: [
      { name: 'ChartContainer config', type: 'ChartConfig', defaultValue: '—', description: '图表配置，定义系列名称、颜色和标签。' },
      { name: 'ChartContainer class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到图表容器的调用方类。' },
      { name: 'ChartTooltipContent indicator', type: 'ChartTooltipIndicator', defaultValue: '\'dot\'', description: '提示框中的指示器类型。' },
      { name: 'ChartLegendContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到图例的调用方类。' }
    ],
    accessibility: { description: 'ChartContainer 生成的 SVG 图表应提供可访问的标题和描述。tooltip 应确保键盘用户可达。' }
  },
  'message': {
    importCode: 'import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from \'moriui\'',
    resources: componentResources('message'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Message 组合 Header、Avatar、Content 与 Footer 组成完整聊天消息；MessageGroup 组织连续消息。', shadcnHeading: 'Composition' },
      { id: '对齐', title: '对齐', description: '通过 align 控制消息在流中的位置（start/end）。', shadcnHeading: 'Alignment' },
      { id: 'RTL', title: 'RTL', description: '消息内容沿 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('message', 'message-demo', '概览', '展示聊天消息结构。'),
      defineExample('message', 'message-avatar', '头像', '消息发送者头像。'),
      defineExample('message', 'message-group', '消息组', '连续消息分组排列。'),
      defineExample('message', 'message-header-footer', '头部与底部', '消息的头部和底部信息。'),
      defineExample('message', 'message-actions', '操作', '消息上的交互操作。'),
      defineExample('message', 'message-attachment', '附件', '消息中的文件附件。'),
      defineExample('message', 'message-markdown', 'Markdown', '渲染 Markdown 内容。')
    ],
    variants: 'Message 的 variant 支持 default/secondary/tinted，align 支持 start/end。',
    api: [
      { name: 'Message variant', type: '\'default\' | \'secondary\' | \'tinted\'', defaultValue: '\'default\'', description: '消息视觉层级。' },
      { name: 'Message align', type: '\'start\' | \'end\'', defaultValue: '\'start\'', description: '消息对齐方向。' },
      { name: 'MessageHeader class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到消息头部的调用方类。' },
      { name: 'MessageAvatar class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到头像区域的调用方类。' },
      { name: 'MessageContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到消息内容的调用方类。' },
      { name: 'MessageFooter class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到消息底部的调用方类。' },
      { name: 'MessageGroup class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到消息分组的调用方类。' }
    ],
    accessibility: { description: '消息列表应由页面提供 log/list 等上下文。消息时间戳和发送者信息应可被辅助技术理解。可交互的消息元素应使用 button 或 a。' }
  },
  'message-scroller': {
    importCode: 'import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility } from \'moriui\'',
    resources: componentResources('message-scroller'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'MessageScroller 由 Provider、Viewport、Content、Item 和 Button 组成，支持滚动定位、锚定与可见性检测。', shadcnHeading: 'Composition' },
      { id: '滚动定位', title: '滚动定位', description: 'scrollAlign 控制新消息的滚动对齐方式。', shadcnHeading: 'Scroll Align' },
      { id: '流式追加', title: '流式追加', description: '支持渐进式插入新消息，保持滚动位置稳定。', shadcnHeading: 'Streaming' },
      { id: '加载历史', title: '加载历史', description: '回溯加载历史消息，不改变当前视口位置。', shadcnHeading: 'Load History' }
    ],
    examples: [
      defineExample('message-scroller', 'message-scroller-demo', '概览', '标准消息滚动容器。'),
      defineExample('message-scroller', 'message-scroller-scrollable', '可滚动', '长消息列表滚动。'),
      defineExample('message-scroller', 'message-scroller-anchoring', '锚定', '新消息自动滚动对齐。'),
      defineExample('message-scroller', 'message-scroller-streaming', '流式', '渐进追加流式消息。'),
      defineExample('message-scroller', 'message-scroller-load-history', '加载历史', '回溯加载旧消息。'),
      defineExample('message-scroller', 'message-scroller-visibility', '可见性', '检测消息进入视口。')
    ],
    variants: 'MessageScroller 的 scrollAlign 支持 start/end；defaultScrollPosition 支持 top/bottom。',
    api: [
      { name: 'MessageScrollerProvider class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到滚动器容器的调用方类。' },
      { name: 'MessageScrollerViewport class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到视口的调用方类。' },
      { name: 'MessageScrollerContent class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到内容容器的调用方类。' },
      { name: 'MessageScrollerItem class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到每条消息项的调用方类。' },
      { name: 'MessageScrollerButton direction', type: '\'top\' | \'bottom\'', defaultValue: '\'bottom\'', description: '滚动按钮的指向方向。' },
      { name: 'useMessageScroller()', type: 'MessageScrollerScrollable', defaultValue: '—', description: '获取滚动器实例进行编程控制。' },
      { name: 'useMessageScrollerScrollable()', type: 'ComputedRef<boolean>', defaultValue: '—', description: '检测内容是否可滚动。' },
      { name: 'useMessageScrollerVisibility()', type: 'MessageScrollerVisibilityState', defaultValue: '—', description: '监听元素的视口可见性。' }
    ],
    accessibility: { description: 'MessageScroller 管理动态内容区域的滚动和焦点。新消息应有适当的 aria-live 区域通知。' }
  },
  'progress': {
    importCode: 'import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from \'moriui\'',
    resources: componentResources('progress'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Progress 由 Track、Indicator、Label 和 Value 组成，通过 value 控制进度百分比。', shadcnHeading: 'Composition' },
      { id: '受控', title: '受控', description: '使用 value prop 控制进度值，支持动态更新。', shadcnHeading: 'Controlled' },
      { id: '标签', title: '标签', description: 'ProgressLabel 和 ProgressValue 提供百分比文字展示。', shadcnHeading: 'Label' },
      { id: 'RTL', title: 'RTL', description: '进度条方向在 RTL 页面中自动翻转。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('progress', 'progress-demo', '概览', '动态进度条展示。'),
      defineExample('progress', 'progress-controlled', '受控', '受控 value 驱动进度。'),
      defineExample('progress', 'progress-label', '标签', '显示百分比文字。'),
      defineExample('progress', 'progress-rtl', 'RTL', '从右到左的进度条。')
    ],
    variants: 'Progress 没有视觉变体；value 范围 0-100，indeterminate 使用动画效果。',
    api: [
      { name: 'Progress value', type: 'number | null', defaultValue: '0', description: '当前进度值（0-100）。' },
      { name: 'Progress max', type: 'number', defaultValue: '100', description: '最大值。' },
      { name: 'ProgressTrack class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到轨道的调用方类。' },
      { name: 'ProgressIndicator class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到指示器的调用方类。' },
      { name: 'ProgressLabel class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到标签文字的调用方类。' },
      { name: 'ProgressValue class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到百分比值的调用方类。' }
    ],
    accessibility: { description: 'Progress 复用 Reka UI 的 progressbar 角色、aria-valuenow、aria-valuemin、aria-valuemax。Label 应描述正在进行的任务。' }
  },
  'resizable': {
    importCode: 'import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from \'moriui\'',
    resources: componentResources('resizable'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Resizable 基于 PanelGroup 组合 Panel 和 Handle，支持水平和垂直方向。', shadcnHeading: 'Composition' },
      { id: '垂直方向', title: '垂直方向', description: 'direction="vertical" 切换上下排列。', shadcnHeading: 'Vertical' },
      { id: '自定义手柄', title: '自定义手柄', description: 'ResizableHandle 默认插槽可放置自定义拖拽图标。', shadcnHeading: 'Handle' },
      { id: 'RTL', title: 'RTL', description: 'PanelGroup 在 RTL 中翻转逻辑方向。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('resizable', 'resizable-demo', '概览', '水平排列三个面板。'),
      defineExample('resizable', 'resizable-vertical', '垂直', '垂直排列面板。'),
      defineExample('resizable', 'resizable-handle', '手柄', '自定义拖拽手柄图标。'),
      defineExample('resizable', 'resizable-rtl', 'RTL', '从右到左的面板布局。')
    ],
    variants: 'ResizablePanelGroup 的 direction 支持 horizontal/vertical；ResizableHandle 显示拖拽区域。',
    api: [
      { name: 'ResizablePanelGroup direction', type: '\'horizontal\' | \'vertical\'', defaultValue: '\'horizontal\'', description: '面板排列方向。' },
      { name: 'ResizablePanelGroup autoSaveId', type: 'string', defaultValue: 'undefined', description: '自动保存面板尺寸的存储键。' },
      { name: 'ResizablePanel defaultSize', type: 'number', defaultValue: 'undefined', description: '面板初始大小百分比。' },
      { name: 'ResizablePanel minSize', type: 'number', defaultValue: 'undefined', description: '面板最小百分比。' },
      { name: 'ResizablePanel maxSize', type: 'number', defaultValue: 'undefined', description: '面板最大百分比。' },
      { name: 'ResizablePanel collapsible', type: 'boolean', defaultValue: 'false', description: '面板可折叠。' },
      { name: 'ResizablePanel collapsedSize', type: 'number', defaultValue: 'undefined', description: '折叠后的大小百分比。' },
      { name: 'ResizableHandle class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到拖拽手柄的调用方类。' }
    ],
    accessibility: { description: 'Resizable 通过 PanelGroup 的 role="region" 和 aria-label 提供语义。Handle 使用 role="separator" 和 aria-valuenow，键盘用户可使用方向键调整尺寸。' }
  },
  'scroll-area': {
    importCode: 'import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from \'moriui\'',
    resources: componentResources('scroll-area'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'ScrollArea 由 Viewport、Scrollbar、Thumb 和 Corner 组成。', shadcnHeading: 'Composition' },
      { id: '方向', title: '方向', description: 'orientation 支持 vertical 和 horizontal。', shadcnHeading: 'Orientation' },
      { id: 'RTL', title: 'RTL', description: '滚动条的左右定位在 RTL 中翻转。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('scroll-area', 'scroll-area-demo', '概览', '长文本垂直滚动。'),
      defineExample('scroll-area', 'scroll-area-horizontal-demo', '横向', '横向内容滚动。'),
      defineExample('scroll-area', 'scroll-area-rtl', 'RTL', '从右到左的滚动区域。')
    ],
    variants: 'ScrollArea 的 type 支持 auto/scroll/always/hover；orientation 支持 vertical/horizontal。',
    api: [
      { name: 'ScrollArea type', type: '\'auto\' | \'always\' | \'scroll\' | \'hover\'', defaultValue: '\'auto\'', description: '滚动条显示模式。' },
      { name: 'ScrollAreaViewport class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到视口的调用方类。' },
      { name: 'ScrollAreaScrollbar orientation', type: '\'vertical\' | \'horizontal\'', defaultValue: '\'vertical\'', description: '滚动条方向。' },
      { name: 'ScrollAreaThumb class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到滚动条滑块的调用方类。' },
      { name: 'ScrollAreaCorner class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到滚动条角落的调用方类。' }
    ],
    accessibility: { description: 'ScrollArea 视图应包含内容本身的语义，滚动条不干扰 Tab 顺序。内容在滚动时始终可读。' }
  },
  'sonner': {
    importCode: 'import { Sonner, toast } from \'moriui\'',
    resources: componentResources('sonner'),
    states: [
      { id: '使用方式', title: '使用方式', description: '安装 Sonner 到应用根节点，通过 toast API 触发通知。', shadcnHeading: 'Usage' },
      { id: '类型', title: '类型', description: 'toast API 支持 default/success/error/info/warning 类型。', shadcnHeading: 'Types' },
      { id: '位置', title: '位置', description: 'position 控制通知的出现位置（如 top-right、bottom-center）。', shadcnHeading: 'Position' },
      { id: 'RTL', title: 'RTL', description: '通知内容沿 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('sonner', 'sonner-demo', '概览', '触发 toast 通知。'),
      defineExample('sonner', 'sonner-types', '类型', '不同风格的通知。'),
      defineExample('sonner', 'sonner-description', '描述', '带描述和操作的通知。'),
      defineExample('sonner', 'sonner-position', '位置', '通知出现位置。')
    ],
    variants: 'Sonner 的 position 支持 top-left/top-center/top-right/bottom-left/bottom-center/bottom-right。',
    api: [
      { name: 'Sonner position', type: 'SonnerPosition', defaultValue: '\'bottom-right\'', description: '通知出现位置。' },
      { name: 'Sonner duration', type: 'number', defaultValue: '4000', description: '通知显示的毫秒数。' },
      { name: 'Sonner closeButton', type: 'boolean', defaultValue: 'false', description: '是否显示关闭按钮。' },
      { name: 'Sonner richColors', type: 'boolean', defaultValue: 'false', description: '是否使用丰富的颜色方案。' },
      { name: 'toast()', type: '(message: string) => string', defaultValue: '—', description: '触发默认通知。' },
      { name: 'toast.success()', type: '(message: string) => string', defaultValue: '—', description: '触发成功通知。' },
      { name: 'toast.error()', type: '(message: string) => string', defaultValue: '—', description: '触发错误通知。' },
      { name: 'toast.info()', type: '(message: string) => string', defaultValue: '—', description: '触发信息通知。' },
      { name: 'toast.warning()', type: '(message: string) => string', defaultValue: '—', description: '触发警告通知。' }
    ],
    accessibility: { description: 'Sonner 使用 role="status" 和 aria-live="polite" 确保通知被屏幕阅读器朗读。可交互的通知应包含操作按钮。' }
  },
  'spinner': {
    importCode: 'import { Spinner } from \'moriui\'',
    resources: componentResources('spinner'),
    states: [
      { id: '尺寸', title: '尺寸', description: 'size 支持 xs、sm、default、lg，通过 CSS 变量控制旋转图标的大小。', shadcnHeading: 'Size' },
      { id: 'RTL', title: 'RTL', description: 'Spinner 的旋转方向与书写方向无关。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('spinner', 'spinner-demo', '概览', '基础旋转加载图标。'),
      defineExample('spinner', 'spinner-size', '尺寸', '四种不同尺寸。'),
      defineExample('spinner', 'spinner-button', '按钮', '按钮内的加载状态。'),
      defineExample('spinner', 'spinner-badge', '徽记', '徽记内的加载状态。'),
      defineExample('spinner', 'spinner-input-group', '输入组合', '输入框旁的加载状态。'),
      defineExample('spinner', 'spinner-rtl', 'RTL', '旋转图标在 RTL 页面中。')
    ],
    variants: 'Spinner 的 size 支持 xs、sm、default、lg。',
    api: [
      { name: 'Spinner size', type: '\'xs\' | \'sm\' | \'default\' | \'lg\'', defaultValue: '\'default\'', description: '旋转图标的尺寸。' },
      { name: 'Spinner class', type: 'HTMLAttributes["class"]', defaultValue: 'undefined', description: '合并到旋转图标容器的调用方类。' }
    ],
    accessibility: { description: 'Spinner 默认输出 role="status" 和 aria-label="Loading"。在按钮等具有自身语义的容器中使用时，应确保容器提供适当的加载状态描述。' }
  },
  'table': {
    importCode: 'import { Table } from \'moriui\'',
    resources: componentResources('table'),
    states: [
      { id: '组合方式', title: '组合方式', description: 'Table 基于 TanStack Table 构建，接收 data 和 columns 作为输入，内置排序、筛选、分页和行选择能力。', shadcnHeading: 'Composition' },
      { id: '尺寸', title: '尺寸', description: 'size 支持 default 和 sm，控制行的密度。', shadcnHeading: 'Size' },
      { id: '行选择', title: '行选择', description: 'selectable 启用行选择复选框。', shadcnHeading: 'Row Selection' },
      { id: 'RTL', title: 'RTL', description: '表格内容沿 dir 排列。', shadcnHeading: 'RTL' }
    ],
    examples: [
      defineExample('table', 'table-demo', '概览', '综合数据表格。'),
      defineExample('table', 'table-actions', '操作', '表格行内操作。'),
      defineExample('table', 'table-footer', '底部', '表格底部分页。'),
      defineExample('table', 'table-rtl', 'RTL', '从右到左的表格布局。')
    ],
    variants: 'Table 的 size 支持 default 与 sm；支持排序、列筛选、全局搜索、分页和行选择。',
    api: [
      { name: 'Table data', type: 'TData[]', defaultValue: '—', description: '必填，表格数据数组。' },
      { name: 'Table columns', type: 'ColumnDef<TData>[]', defaultValue: '—', description: '必填，列定义数组。' },
      { name: 'Table size', type: '\'default\' | \'sm\'', defaultValue: '\'default\'', description: '表格行密度。' },
      { name: 'Table selectable', type: 'boolean', defaultValue: 'false', description: '是否显示行选择复选框。' },
      { name: 'Table pageSizeOptions', type: 'number[]', defaultValue: 'undefined', description: '可选的每页条数选项。' },
      { name: 'Table searchPlaceholder', type: 'string', defaultValue: 'undefined', description: '全局搜索占位提示。' },
      { name: 'Table emptyText', type: 'string', defaultValue: 'undefined', description: '空数据显示文本。' }
    ],
    accessibility: { description: 'Table 输出原生 table 元素，配合 TanStack Table 的排序、选择和分页 ARIA。表头使用 scope="col"，排序按钮有 aria-sort。' }
  }
}

const controlSlugs = [
  'attachment',
  'button',
  'button-group',
  'checkbox',
  'combobox',
  'field',
  'input',
  'input-group',
  'input-otp',
  'label',
  'radio-group',
  'select',
  'slider',
  'switch',
  'textarea',
  'toggle',
  'toggle-group'
] as const
const publishedSlugs = new Set([
  ...baseSlugs,
  ...controlSlugs,
  'alert',
  'alert-dialog',
  'command',
  'context-menu',
  'dialog',
  'drawer',
  'dropdown-menu',
  'hover-card',
  'sheet',
  'tooltip',
  'accordion',
  'breadcrumb',
  'calendar',
  'collapsible',
  'date-picker',
  'date-range-picker',
  'menubar',
  'navigation-menu',
  'pagination',
  'tabs',
  'carousel',
  'chart',
  'message',
  'message-scroller',
  'progress',
  'resizable',
  'scroll-area',
  'sonner',
  'spinner',
  'table'
])
const publishedPreviews: Partial<Record<string, Component>> = {
  ...Object.fromEntries(baseSlugs.map(slug => [slug, defineCatalog(slug)])),
  ...Object.fromEntries(controlSlugs.map(slug => [slug, defineCatalog(slug)])),
  ...Object.fromEntries(['alert', 'alert-dialog', 'command', 'context-menu', 'dialog', 'drawer', 'dropdown-menu', 'hover-card', 'sheet', 'tooltip'].map(slug => [slug, defineCatalog(slug)])),
  ...Object.fromEntries(['accordion', 'breadcrumb', 'calendar', 'collapsible', 'date-picker', 'date-range-picker', 'menubar', 'navigation-menu', 'pagination', 'tabs'].map(slug => [slug, defineCatalog(slug)])),
  ...Object.fromEntries(['carousel', 'chart', 'message', 'message-scroller', 'progress', 'resizable', 'scroll-area', 'sonner', 'spinner', 'table'].map(slug => [slug, defineCatalog(slug)]))
}

function getComponentName(slug: string) {
  return slug
    .split('-')
    .map(part => part === 'otp' ? part.toUpperCase() : `${part[0]?.toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

export const componentRegistry: readonly ComponentRecord[] = componentInventory.map(([group, slug, title, related]) => ({
  slug,
  name: getComponentName(slug),
  title,
  group,
  status: publishedSlugs.has(slug) ? 'published' as const : 'coming-soon' as const,
  catalogPreview: publishedPreviews[slug] ?? CatalogPlaceholder,
  summary: `用于${title}场景的 MoriUI 组件。`,
  related,
  reference: references[slug]
}))

const groupOrder: readonly ComponentGroup[] = ['基础', '表单', '导航', '浮层', '数据与反馈']

export const componentGroups: readonly ComponentGroupDefinition[] = groupOrder.map(title => ({
  title,
  items: componentRegistry.filter(component => component.group === title)
}))

export const getComponent = (slug: string) => componentRegistry.find(component => component.slug === slug)

export function assertPublishedReference(record: ComponentRecord): asserts record is PublishedComponentRecord {
  if (record.status !== 'published')
    return

  const reference = record.reference
  const isComplete = Boolean(
    reference
    && reference.importCode.trim()
    && reference.states.length
    && reference.examples.length
    && reference.examples.every(example => example.code.trim())
    && reference.api.length
    && reference.accessibility.description.trim()
    && record.related.every(slug => componentRegistry.some(component => component.slug === slug))
  )

  if (!isComplete) {
    throw new Error(`[MoriUI 文档] 已发布组件「${record.slug}」缺少参考资料或资料不完整`)
  }
}
