import type { Ref } from 'vue'
import type {
  MessageScrollerContext,
  MessageScrollerMode,
  MessageScrollerProviderOptions,
  MessageScrollerScrollOptions
} from './types'

import { nextTick, onBeforeUnmount, readonly, shallowRef, watch } from 'vue'
import {
  EMPTY_MESSAGE_SCROLLER_SCROLLABLE,
  EMPTY_MESSAGE_SCROLLER_VISIBILITY,
  SCROLL_POSITION_EPSILON
} from './types'
import {
  getElementScrollTop,
  getElementViewportTop,
  getFirstVisibleMessageItem,
  getMessageScrollerItems,
  getMessageScrollerScrollable,
  getTailSpacerHeight,
  getVisibilityState
} from './geometry'

interface PendingScroll {
  messageId: string
  options?: MessageScrollerScrollOptions
}

export function useMessageScrollerController(options: MessageScrollerProviderOptions) {
  const rootElement = shallowRef<HTMLElement | null>(null)
  const viewportElement = shallowRef<HTMLElement | null>(null)
  const contentElement = shallowRef<HTMLElement | null>(null)
  const spacerElement = shallowRef<HTMLElement | null>(null)
  const scrollable = shallowRef({ ...EMPTY_MESSAGE_SCROLLER_SCROLLABLE })
  const visibility = shallowRef({ ...EMPTY_MESSAGE_SCROLLER_VISIBILITY })
  const messageElements = new Map<string, HTMLElement>()
  const visibleMessageIds = new Set<string>()
  let mode: MessageScrollerMode = options.autoScroll ? 'following-bottom' : 'free-scrolling'
  let lastScrollTop = 0
  let itemCount = 0
  let firstItem: HTMLElement | null = null
  let defaultPositionApplied = false
  let preserveScrollOnPrepend = true
  let prependAnchor: { element: HTMLElement, viewportTop: number } | null = null
  let streamingTurn: HTMLElement | null = null
  let pendingScroll: PendingScroll | null = null
  let spacerGap = 0
  let spacerHeight = 0
  let stateFrame: number | null = null
  let visibilityFrame: number | null = null
  let resizeFrame: number | null = null
  let autoScrolling = false
  let autoScrollingTimer: number | null = null
  let visibilitySubscribers = 0
  let contentObserver: MutationObserver | null = null
  let contentResizeObserver: ResizeObserver | null = null
  let viewportResizeObserver: ResizeObserver | null = null
  let visibilityObserver: IntersectionObserver | null = null

  function requestFrame(callback: FrameRequestCallback) {
    return window.requestAnimationFrame(callback)
  }

  function cancelFrame(frame: number | null) {
    if (frame !== null)
      window.cancelAnimationFrame(frame)
  }

  function writeStateAttributes(state = scrollable.value) {
    const scrollableDirection = [state.start && 'start', state.end && 'end'].filter(Boolean).join(' ')
    for (const element of [rootElement.value, viewportElement.value]) {
      if (!element)
        continue
      if (scrollableDirection)
        element.setAttribute('data-scrollable', scrollableDirection)
      else element.removeAttribute('data-scrollable')
      element.toggleAttribute('data-autoscrolling', autoScrolling)
    }
  }

  function commitScrollState() {
    const viewport = viewportElement.value
    const next = getMessageScrollerScrollable(contentElement.value, spacerElement.value, viewport, options.scrollEdgeThreshold)
    const scrolledUp = viewport ? viewport.scrollTop < lastScrollTop - SCROLL_POSITION_EPSILON : false
    lastScrollTop = viewport?.scrollTop ?? 0
    if (mode === 'following-bottom' && next.end && scrolledUp && !autoScrolling)
      mode = 'free-scrolling'
    const published = mode === 'following-bottom' ? { ...next, end: false } : next
    scrollable.value = published
    writeStateAttributes(published)
  }

  function scheduleStateCommit() {
    if (stateFrame !== null)
      return
    stateFrame = requestFrame(() => {
      stateFrame = null
      commitScrollState()
    })
  }

  function syncVisibility() {
    visibility.value = getVisibilityState(
      contentElement.value,
      spacerElement.value,
      viewportElement.value,
      visibleMessageIds,
      options.scrollMargin,
      options.scrollPreviousItemPeek
    )
  }

  function scheduleVisibilitySync() {
    if (visibilitySubscribers === 0 || visibilityFrame !== null)
      return
    visibilityFrame = requestFrame(() => {
      visibilityFrame = null
      if (visibilitySubscribers > 0)
        syncVisibility()
    })
  }

  function setAutoScrolling(value: boolean) {
    if (autoScrollingTimer !== null) {
      window.clearTimeout(autoScrollingTimer)
      autoScrollingTimer = null
    }
    autoScrolling = value
    if (value) {
      autoScrollingTimer = window.setTimeout(() => {
        autoScrolling = false
        autoScrollingTimer = null
        commitScrollState()
      }, 180)
    }
    commitScrollState()
  }

  function setTailSpacerHeight(height: number) {
    const spacer = spacerElement.value
    if (!spacer)
      return
    const nextHeight = Math.max(0, Math.ceil(height))
    if (spacerHeight === nextHeight)
      return
    spacerHeight = nextHeight
    spacer.hidden = nextHeight === 0
    spacer.style.height = `${nextHeight}px`
    spacer.style.marginTop = nextHeight > 0 ? `${-spacerGap}px` : ''
  }

  function scrollToPosition(scrollTop: number, behavior: ScrollBehavior = 'auto', programmatic = false) {
    const viewport = viewportElement.value
    if (!viewport)
      return false
    const target = Math.max(0, scrollTop)
    if (Math.abs(viewport.scrollTop - target) <= SCROLL_POSITION_EPSILON) {
      viewport.scrollTop = target
      commitScrollState()
      return true
    }
    if (programmatic)
      setAutoScrolling(true)
    viewport.scrollTo({ top: target, behavior })
    scheduleStateCommit()
    return true
  }

  function scrollToStart(commandOptions: MessageScrollerScrollOptions = {}) {
    if (!viewportElement.value)
      return false
    setTailSpacerHeight(0)
    streamingTurn = null
    mode = 'free-scrolling'
    const handled = scrollToPosition(0, commandOptions.behavior)
    scheduleVisibilitySync()
    return handled
  }

  function scrollToEnd(commandOptions: MessageScrollerScrollOptions = {}) {
    const viewport = viewportElement.value
    if (!viewport)
      return false
    setTailSpacerHeight(0)
    streamingTurn = null
    mode = options.autoScroll ? 'following-bottom' : 'free-scrolling'
    const handled = scrollToPosition(viewport.scrollHeight - viewport.clientHeight, commandOptions.behavior, true)
    scheduleVisibilitySync()
    return handled
  }

  function scrollToElement(element: HTMLElement, commandOptions: MessageScrollerScrollOptions = {}, keepPreviousPeek = false) {
    const content = contentElement.value
    const viewport = viewportElement.value
    if (!content || !viewport || !content.contains(element))
      return false
    const margin = commandOptions.scrollMargin ?? options.scrollMargin
    const scrollTop = getElementScrollTop(
      element,
      viewport,
      spacerElement.value,
      commandOptions.align ?? 'start',
      keepPreviousPeek ? margin + options.scrollPreviousItemPeek : margin
    )
    setTailSpacerHeight(getTailSpacerHeight(content, spacerElement.value, viewport, scrollTop))
    prependAnchor = { element, viewportTop: getElementViewportTop(element, viewport) }
    mode = keepPreviousPeek ? 'anchored-to-message' : 'settling-jump'
    streamingTurn = keepPreviousPeek ? element : null
    const handled = scrollToPosition(scrollTop, commandOptions.behavior)
    scheduleVisibilitySync()
    return handled
  }

  function scrollToMessage(messageId: string, commandOptions?: MessageScrollerScrollOptions) {
    const element = messageElements.get(messageId)
    if (!element) {
      pendingScroll = { messageId, options: commandOptions }
      defaultPositionApplied = true
      return true
    }
    defaultPositionApplied = true
    const handled = scrollToElement(element, commandOptions)
    if (handled)
      pendingScroll = null
    return handled
  }

  function flushPendingScroll() {
    if (!pendingScroll)
      return false
    const element = messageElements.get(pendingScroll.messageId)
    if (!element)
      return false
    const handled = scrollToElement(element, pendingScroll.options)
    if (handled)
      pendingScroll = null
    return handled
  }

  function capturePrependAnchor() {
    const content = contentElement.value
    const viewport = viewportElement.value
    if (!content || !viewport)
      return
    const element = getFirstVisibleMessageItem(content, spacerElement.value, viewport)
    prependAnchor = element ? { element, viewportTop: getElementViewportTop(element, viewport) } : null
  }

  function restorePrependedAnchor() {
    const viewport = viewportElement.value
    if (!preserveScrollOnPrepend || !viewport || !prependAnchor?.element.isConnected)
      return false
    const delta = getElementViewportTop(prependAnchor.element, viewport) - prependAnchor.viewportTop
    if (Math.abs(delta) <= SCROLL_POSITION_EPSILON)
      return false
    viewport.scrollTop += delta
    return true
  }

  function applyDefaultScrollPosition() {
    const content = contentElement.value
    if (defaultPositionApplied || !content || itemCount === 0)
      return false
    defaultPositionApplied = true
    if (options.defaultScrollPosition === 'start')
      return scrollToStart()
    if (options.defaultScrollPosition === 'last-anchor') {
      const anchor = [...getMessageScrollerItems(content, spacerElement.value)].reverse().find(item => item.dataset.scrollAnchor === 'true')
      if (anchor && viewportElement.value && viewportElement.value.scrollHeight > viewportElement.value.clientHeight)
        return scrollToElement(anchor, {}, true)
    }
    return scrollToEnd()
  }

  function handleContentChange() {
    const content = contentElement.value
    const viewport = viewportElement.value
    if (!content || !viewport)
      return
    const items = getMessageScrollerItems(content, spacerElement.value)
    const previousCount = itemCount
    const previousFirst = firstItem
    firstItem = items[0] ?? null
    const prepended = previousFirst !== null && firstItem !== previousFirst && items.includes(previousFirst)
    if (prepended)
      restorePrependedAnchor()
    const newAnchors = items.slice(previousCount).filter(item => item.dataset.scrollAnchor === 'true')
    itemCount = items.length
    spacerGap = Number.parseFloat(window.getComputedStyle(content).rowGap || window.getComputedStyle(content).gap) || 0
    if (!defaultPositionApplied) {
      nextTick(applyDefaultScrollPosition)
    } else if (newAnchors.length === 1 && !prepended) {
      scrollToElement(newAnchors[0]!, {}, true)
    } else if (options.autoScroll && mode === 'following-bottom') {
      scrollToEnd()
    }
    flushPendingScroll()
    commitScrollState()
    scheduleVisibilitySync()
  }

  function handleResize() {
    if (mode === 'following-bottom' && options.autoScroll) {
      scrollToEnd()
    } else if (mode === 'anchored-to-message' && streamingTurn?.isConnected) {
      scrollToElement(streamingTurn, {}, true)
    } else {
      commitScrollState()
      scheduleVisibilitySync()
    }
  }

  function scheduleResize() {
    cancelFrame(resizeFrame)
    resizeFrame = requestFrame(() => {
      resizeFrame = null
      handleResize()
    })
  }

  function setRootElement(element: HTMLElement | null) {
    rootElement.value = element
    writeStateAttributes()
  }

  function setViewportElement(element: HTMLElement | null) {
    viewportResizeObserver?.disconnect()
    viewportResizeObserver = null
    viewportElement.value = element
    if (element && typeof ResizeObserver !== 'undefined') {
      viewportResizeObserver = new ResizeObserver(scheduleResize)
      viewportResizeObserver.observe(element)
    }
    if (visibilitySubscribers > 0)
      startVisibilityObserver()
    commitScrollState()
  }

  function setContentElement(element: HTMLElement | null) {
    contentObserver?.disconnect()
    contentResizeObserver?.disconnect()
    contentObserver = null
    contentResizeObserver = null
    contentElement.value = element
    if (!element)
      return
    if (typeof MutationObserver !== 'undefined') {
      contentObserver = new MutationObserver(handleContentChange)
      contentObserver.observe(element, { childList: true })
    }
    if (typeof ResizeObserver !== 'undefined') {
      contentResizeObserver = new ResizeObserver(scheduleResize)
      contentResizeObserver.observe(element)
    }
    handleContentChange()
  }

  function setSpacerElement(element: HTMLElement | null) {
    spacerElement.value = element
    if (element)
      handleContentChange()
  }

  function registerMessage(messageId: string, element: HTMLElement | null, previousElement: HTMLElement | null = null) {
    if (previousElement && messageElements.get(messageId) === previousElement)
      messageElements.delete(messageId)
    if (element) {
      messageElements.set(messageId, element)
      visibilityObserver?.observe(element)
    } else if (messageElements.get(messageId) === previousElement) {
      messageElements.delete(messageId)
    }
    flushPendingScroll()
    scheduleVisibilitySync()
  }

  function syncAfterScroll() {
    const rawState = getMessageScrollerScrollable(
      contentElement.value,
      spacerElement.value,
      viewportElement.value,
      options.scrollEdgeThreshold
    )
    if (mode === 'following-bottom' && rawState.end && !autoScrolling)
      mode = 'free-scrolling'
    capturePrependAnchor()
    scheduleStateCommit()
    scheduleVisibilitySync()
  }

  function userScrollIntent() {
    cancelFrame(resizeFrame)
    resizeFrame = null
    mode = 'free-scrolling'
    streamingTurn = null
    setTailSpacerHeight(0)
    commitScrollState()
  }

  function startVisibilityObserver() {
    if (typeof IntersectionObserver === 'undefined')
      return
    visibilityObserver?.disconnect()
    visibilityObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const messageId = (entry.target as HTMLElement).dataset.messageId
        if (!messageId)
          continue
        if (entry.isIntersecting)
          visibleMessageIds.add(messageId)
        else visibleMessageIds.delete(messageId)
      }
      scheduleVisibilitySync()
    }, { root: viewportElement.value, threshold: 0 })
    for (const element of messageElements.values())
      visibilityObserver.observe(element)
  }

  function observeVisibility() {
    visibilitySubscribers += 1
    if (visibilitySubscribers === 1)
      startVisibilityObserver()
    scheduleVisibilitySync()
  }

  function unobserveVisibility() {
    visibilitySubscribers = Math.max(0, visibilitySubscribers - 1)
    if (visibilitySubscribers > 0)
      return
    visibilityObserver?.disconnect()
    visibilityObserver = null
    visibleMessageIds.clear()
    visibility.value = { ...EMPTY_MESSAGE_SCROLLER_VISIBILITY }
  }

  watch(() => options.autoScroll, autoScroll => {
    if (autoScroll && mode === 'free-scrolling' && !scrollable.value.end)
      mode = 'following-bottom'
    if (!autoScroll && mode === 'following-bottom')
      mode = 'free-scrolling'
    handleResize()
  })

  watch(() => options.defaultScrollPosition, () => {
    defaultPositionApplied = false
    nextTick(applyDefaultScrollPosition)
  })

  onBeforeUnmount(() => {
    cancelFrame(stateFrame)
    cancelFrame(visibilityFrame)
    cancelFrame(resizeFrame)
    if (autoScrollingTimer !== null)
      window.clearTimeout(autoScrollingTimer)
    contentObserver?.disconnect()
    contentResizeObserver?.disconnect()
    viewportResizeObserver?.disconnect()
    visibilityObserver?.disconnect()
  })

  const context: MessageScrollerContext = {
    scrollable: readonly(scrollable) as Readonly<Ref<typeof scrollable.value>>,
    visibility: readonly(visibility) as Readonly<Ref<typeof visibility.value>>,
    setRootElement,
    setViewportElement,
    setContentElement,
    setSpacerElement,
    registerMessage,
    setPreserveScrollOnPrepend: value => {
      preserveScrollOnPrepend = value
    },
    syncAfterScroll,
    userScrollIntent,
    scrollToStart,
    scrollToEnd,
    scrollToMessage,
    observeVisibility,
    unobserveVisibility
  }

  return context
}
