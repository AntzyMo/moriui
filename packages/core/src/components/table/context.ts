import type { InjectionKey } from 'vue'
import type { TableInstance } from './types'

import { inject, provide } from 'vue'

export interface TableContext {
  table: TableInstance<any>
}

export const tableContextKey: InjectionKey<TableContext> = Symbol('table-context')

export function provideTableContext(context: TableContext) {
  provide(tableContextKey, context)
}

export function useTableContext() {
  const context = inject(tableContextKey)

  if (!context) {
    throw new Error('Table 子组件必须在 Table 内部使用。')
  }

  return context
}
