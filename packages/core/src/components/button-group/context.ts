import type { ComputedRef, InjectionKey } from 'vue'
import type { ButtonGroupVariants } from './variants'

export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants['orientation']>

export interface ButtonGroupContext {
  orientation: ComputedRef<ButtonGroupOrientation>
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol('ButtonGroupContext')
