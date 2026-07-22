import type { ComponentRecord } from './registry'

import { getContentToc, type ContentTocLink, type TocItem } from './toc'

export interface ComponentContentPage {
  body: {
    toc?: {
      links?: readonly ContentTocLink[]
    }
  }
}

export interface ComponentRouteDependencies {
  getComponent: (slug: string) => ComponentRecord | undefined
  createNotFound: () => never
}

export interface ContentRouteDecision<TContent extends ComponentContentPage = ComponentContentPage> {
  kind: 'content'
  contentPage: TContent
  toc: readonly TocItem[]
}

export function resolveComponentRoute<TContent extends ComponentContentPage>(options: {
  slug: string
  contentPage: TContent | null | undefined
} & ComponentRouteDependencies): ContentRouteDecision<TContent> {
  if (!options.getComponent(options.slug) || !options.contentPage)
    return options.createNotFound()

  return {
    kind: 'content',
    contentPage: options.contentPage,
    toc: getContentToc(options.contentPage.body.toc?.links ?? [])
  }
}
