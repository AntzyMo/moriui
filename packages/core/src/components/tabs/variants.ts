import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const tabsVariants = tv({
  slots: {
    root: 'tabs',
    list: 'tabs__list',
    trigger: 'tabs__trigger',
    content: 'tabs__content'
  },
  variants: {
    variant: {
      default: {
        list: 'tabs__list--default'
      },
      line: {
        list: 'tabs__list--line'
      }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type TabsVariants = VariantProps<typeof tabsVariants>
