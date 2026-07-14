import { messageScrollerContextKey } from './types'
import { computed, inject, onBeforeUnmount, onMounted } from 'vue'

function useContext() {
  const context = inject(messageScrollerContextKey)
  if (!context)
    throw new Error('MessageScroller 相关组件必须嵌套在 <MessageScrollerProvider> 内。')
  return context
}

export function useMessageScroller() {
  const context = useContext()
  return {
    scrollToStart: context.scrollToStart,
    scrollToEnd: context.scrollToEnd,
    scrollToMessage: context.scrollToMessage
  }
}

export function useMessageScrollerScrollable() {
  const context = useContext()
  return {
    start: computed(() => context.scrollable.value.start),
    end: computed(() => context.scrollable.value.end)
  }
}

export function useMessageScrollerVisibility() {
  const context = useContext()
  onMounted(context.observeVisibility)
  onBeforeUnmount(context.unobserveVisibility)
  return {
    currentAnchorId: computed(() => context.visibility.value.currentAnchorId),
    visibleMessageIds: computed(() => context.visibility.value.visibleMessageIds)
  }
}

export { useContext as useMessageScrollerContext }
