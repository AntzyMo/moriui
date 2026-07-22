import type { Component } from 'vue'

import { defineAsyncComponent } from 'vue'
import { resolveDocumentationExampleAtPath } from './examples'
import { componentInventory } from './inventory'

export type ComponentGroup = '基础' | '表单' | '导航' | '浮层' | '数据与反馈'
export type ComponentStatus = 'published' | 'coming-soon'

export interface ComponentRecord {
  slug: string
  name: string
  title: string
  group: ComponentGroup
  status: ComponentStatus
  catalogPreview: Component
  summary: string
  related: readonly string[]
}

export interface ComponentGroupDefinition {
  title: ComponentGroup
  items: readonly ComponentRecord[]
}

function defineCatalog(slug: string) {
  return resolveDocumentationExampleAtPath(`../components/examples/${slug}/catalog.vue`).preview
}

const CatalogPlaceholder = defineAsyncComponent(() => import('../components/CatalogPlaceholder.vue'))

const publishedPreviews: Partial<Record<string, Component>> = Object.fromEntries(
  componentInventory.map(([, slug]) => [slug, defineCatalog(slug)])
)

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
  status: 'published' as const,
  catalogPreview: publishedPreviews[slug] ?? CatalogPlaceholder,
  summary: `用于${title}场景的 MoriUI 组件。`,
  related
}))

const groupOrder: readonly ComponentGroup[] = ['基础', '表单', '导航', '浮层', '数据与反馈']

export const componentGroups: readonly ComponentGroupDefinition[] = groupOrder.map(title => ({
  title,
  items: componentRegistry.filter(component => component.group === title)
}))

export const getComponent = (slug: string) => componentRegistry.find(component => component.slug === slug)
