import type { MessageScrollerScrollable, MessageScrollerScrollAlign, MessageScrollerVisibilityState } from './types'

export function getMessageScrollerItems(content: HTMLElement, spacer: HTMLElement | null) {
  return Array.from(content.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child !== spacer)
}

export function getBlockPadding(element: HTMLElement) {
  const style = window.getComputedStyle(element)
  return {
    start: readCssPixel(style.paddingBlockStart || style.paddingTop),
    end: readCssPixel(style.paddingBlockEnd || style.paddingBottom)
  }
}

export function getElementTop(element: HTMLElement, viewport: HTMLElement) {
  const elementRect = element.getBoundingClientRect()
  const viewportRect = viewport.getBoundingClientRect()
  return elementRect.top - viewportRect.top + viewport.scrollTop
}

export function getElementViewportTop(element: HTMLElement, viewport: HTMLElement) {
  return element.getBoundingClientRect().top - viewport.getBoundingClientRect().top
}

export function getContentBottom(content: HTMLElement, spacer: HTMLElement | null, viewport: HTMLElement) {
  const padding = getBlockPadding(content)
  const viewportRect = viewport.getBoundingClientRect()
  let bottom = padding.start + padding.end
  for (const item of getMessageScrollerItems(content, spacer)) {
    bottom = Math.max(bottom, item.getBoundingClientRect().bottom - viewportRect.top + viewport.scrollTop + padding.end)
  }
  return bottom
}

export function getMessageScrollerScrollable(content: HTMLElement | null, spacer: HTMLElement | null, viewport: HTMLElement | null, threshold: number): MessageScrollerScrollable {
  if (!content || !viewport)
    return { start: false, end: false }
  const bottom = getContentBottom(content, spacer, viewport)
  return {
    start: viewport.scrollTop > threshold,
    end: bottom - viewport.scrollTop - viewport.clientHeight > threshold
  }
}

export function getElementScrollTop(element: HTMLElement, viewport: HTMLElement, spacer: HTMLElement | null, align: MessageScrollerScrollAlign, scrollMargin: number) {
  const top = getElementTop(element, viewport)
  const height = element.getBoundingClientRect().height
  const padding = spacer?.parentElement ? getBlockPadding(spacer.parentElement) : { start: 0, end: 0 }
  if (align === 'center')
    return top - padding.start - (Math.max(0, viewport.clientHeight - padding.start - padding.end) - height) / 2 - scrollMargin
  if (align === 'end')
    return top - viewport.clientHeight + height + padding.end + scrollMargin
  if (align === 'nearest') {
    const bottom = top + height
    const viewportTop = viewport.scrollTop + padding.start
    const viewportBottom = viewport.scrollTop + viewport.clientHeight - padding.end
    if (top >= viewportTop && bottom <= viewportBottom)
      return viewport.scrollTop
    return top < viewportTop ? top - padding.start - scrollMargin : bottom - viewport.clientHeight + padding.end + scrollMargin
  }
  return top - padding.start - scrollMargin
}

export function getTailSpacerHeight(content: HTMLElement, spacer: HTMLElement | null, viewport: HTMLElement, scrollTop: number) {
  return scrollTop + viewport.clientHeight - getContentBottom(content, spacer, viewport)
}

export function getFirstVisibleMessageItem(content: HTMLElement, spacer: HTMLElement | null, viewport: HTMLElement) {
  const viewportRect = viewport.getBoundingClientRect()
  return getMessageScrollerItems(content, spacer).find(item => {
    const rect = item.getBoundingClientRect()
    return Boolean(item.dataset.messageId) && rect.bottom > viewportRect.top && rect.top < viewportRect.bottom
  }) ?? null
}

export function getVisibilityState(content: HTMLElement | null, spacer: HTMLElement | null, viewport: HTMLElement | null, visibleIds: Set<string>, scrollMargin: number, previousPeek: number): MessageScrollerVisibilityState {
  if (!content || !viewport)
    return { currentAnchorId: null, visibleMessageIds: [] }
  const viewportRect = viewport.getBoundingClientRect()
  const readingLine = viewportRect.top + scrollMargin + previousPeek
  const useLayoutFallback = typeof IntersectionObserver === 'undefined'
  const visibleMessageIds: string[] = []
  let currentAnchorId: string | null = null
  for (const item of getMessageScrollerItems(content, spacer)) {
    const messageId = item.dataset.messageId
    if (!messageId)
      continue
    const isAnchor = item.dataset.scrollAnchor === 'true'
    const rect = isAnchor || useLayoutFallback ? item.getBoundingClientRect() : null
    if ((useLayoutFallback && rect && rect.bottom > readingLine && rect.top < viewportRect.bottom) || visibleIds.has(messageId))
      visibleMessageIds.push(messageId)
    if (isAnchor && rect && rect.top <= readingLine + 0.5)
      currentAnchorId = messageId
  }
  return { currentAnchorId, visibleMessageIds }
}

export function readCssPixel(value: string | undefined) {
  const number = Number.parseFloat(value ?? '')
  return Number.isFinite(number) ? number : 0
}
