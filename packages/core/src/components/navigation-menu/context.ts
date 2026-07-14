import type { InjectionKey, Ref } from 'vue'

export const navigationMenuAutoViewportKey: InjectionKey<Readonly<Ref<boolean>>> = Symbol('navigation-menu-auto-viewport')
