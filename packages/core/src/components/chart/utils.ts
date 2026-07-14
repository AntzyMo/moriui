import type { Component } from 'vue'
import type { ChartConfig, ChartTooltipTemplate, ChartValue } from './context'

import { h, render } from 'vue'

export function componentToString<P extends object>(
  config: ChartConfig,
  component: Component,
  props?: P,
  documentRef: Document | null | undefined = typeof document === 'undefined' ? undefined : document
): ChartTooltipTemplate | undefined {
  if (!documentRef)
    return undefined

  const cache = new Map<string, string>()

  return (source, x: ChartValue) => {
    const payload = 'data' in source ? source.data : source
    const cacheKey = JSON.stringify({ payload, x })
    const cached = cache.get(cacheKey)

    if (cached)
      return cached

    const container = documentRef.createElement('div')
    const vnode = h(component, { ...props, config, payload, x })

    render(vnode, container)
    cache.set(cacheKey, container.innerHTML)

    return container.innerHTML
  }
}
