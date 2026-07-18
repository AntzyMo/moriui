import { readonly } from 'vue'
import { useColorMode } from '@vueuse/core'

export type SiteTheme = 'light' | 'dark'

export function useSiteTheme() {
  const theme = useColorMode({
    selector: 'html',
    attribute: 'data-theme',
    storageKey: 'moriui-docs-theme',
    initialValue: 'auto',
    emitAuto: false
  })

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme: readonly(theme), toggleTheme }
}
