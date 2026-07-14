import type { ComputedRef, InjectionKey } from 'vue'
import type { ToggleGroupVariants } from './variants'

export interface ToggleGroupContext {
  variant: ComputedRef<ToggleGroupVariants['variant']>
  size: ComputedRef<ToggleGroupVariants['size']>
  spacing: ComputedRef<number>
}

export const toggleGroupContextKey: InjectionKey<ToggleGroupContext> = Symbol('toggle-group-context')
