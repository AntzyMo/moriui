import type { InjectionKey, Ref } from 'vue'

export type MessageScrollerDefaultScrollPosition = 'start' | 'end' | 'last-anchor'
export type MessageScrollerButtonDirection = 'start' | 'end'
export type MessageScrollerScrollAlign = 'start' | 'center' | 'end' | 'nearest'
export type MessageScrollerMode = 'following-bottom' | 'free-scrolling' | 'anchored-to-message' | 'settling-jump'

export interface MessageScrollerScrollOptions {
  align?: MessageScrollerScrollAlign
  behavior?: ScrollBehavior
  scrollMargin?: number
}

export interface MessageScrollerScrollable {
  start: boolean
  end: boolean
}

export interface MessageScrollerVisibilityState {
  currentAnchorId: string | null
  visibleMessageIds: string[]
}

export interface MessageScrollerProviderOptions {
  autoScroll: boolean
  defaultScrollPosition: MessageScrollerDefaultScrollPosition
  scrollEdgeThreshold: number
  scrollPreviousItemPeek: number
  scrollMargin: number
}

export interface MessageScrollerContext {
  scrollable: Readonly<Ref<MessageScrollerScrollable>>
  visibility: Readonly<Ref<MessageScrollerVisibilityState>>
  setRootElement: (element: HTMLElement | null) => void
  setViewportElement: (element: HTMLElement | null) => void
  setContentElement: (element: HTMLElement | null) => void
  setSpacerElement: (element: HTMLElement | null) => void
  registerMessage: (messageId: string, element: HTMLElement | null, previousElement?: HTMLElement | null) => void
  setPreserveScrollOnPrepend: (value: boolean) => void
  syncAfterScroll: () => void
  userScrollIntent: () => void
  scrollToStart: (options?: MessageScrollerScrollOptions) => boolean
  scrollToEnd: (options?: MessageScrollerScrollOptions) => boolean
  scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) => boolean
  observeVisibility: () => void
  unobserveVisibility: () => void
}

export const messageScrollerContextKey: InjectionKey<MessageScrollerContext> = Symbol('message-scroller')

export const DEFAULT_SCROLL_EDGE_THRESHOLD = 8
export const DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK = 64
export const DEFAULT_SCROLL_MARGIN = 0
export const SCROLL_POSITION_EPSILON = 0.5
export const USER_SCROLL_KEYS = new Set(['ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', ' '])

export const EMPTY_MESSAGE_SCROLLER_SCROLLABLE: MessageScrollerScrollable = { start: false, end: false }
export const EMPTY_MESSAGE_SCROLLER_VISIBILITY: MessageScrollerVisibilityState = { currentAnchorId: null, visibleMessageIds: [] }
