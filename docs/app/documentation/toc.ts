import { guideInventory } from './inventory'
import { componentGroups } from './registry'

export interface TocItem {
  id: string
  label: string
}

export interface ContentTocLink {
  id: string
  text: string
  depth: number
  children?: readonly ContentTocLink[]
}

export interface GuidePage {
  path: string
  title: string
  summary: string
  toc: readonly TocItem[]
}

const toc = (...labels: string[]): readonly TocItem[] => labels.map(label => ({ id: label, label }))

export const guidePages: readonly GuidePage[] = guideInventory.map(guide => ({
  ...guide,
  toc: toc(...guide.toc)
}))

export const getGuidePage = (path: string) => guidePages.find(page => page.path === path)

export const catalogToc: readonly TocItem[] = componentGroups.map(group => ({
  id: group.title,
  label: group.title
}))

export function getContentToc(links: readonly ContentTocLink[]): readonly TocItem[] {
  return links.flatMap(link => [
    ...(link.depth === 2 || link.depth === 3 ? [{ id: link.id, label: link.text }] : []),
    ...getContentToc(link.children ?? [])
  ])
}

// 为只需要示例目录形状的调用方保留默认指南目录。
export const guideToc: readonly TocItem[] = guidePages[0]!.toc
