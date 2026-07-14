<script setup lang="ts">
  import { tableVariants } from './variants'
  import { useTableContext } from './context'

  interface Props {
    searchPlaceholder: string
  }

  const props = defineProps<Props>()
  const { table } = useTableContext()
  const slots = tableVariants()

  function handleSearch(event: Event) {
    table.setGlobalFilter((event.target as HTMLInputElement).value)
  }
</script>

<template>
  <div :class="slots.toolbar()" data-slot="table-toolbar">
    <input
      :class="slots.search()"
      :placeholder="props.searchPlaceholder"
      :value="String(table.getState().globalFilter ?? '')"
      aria-label="全局搜索"
      data-slot="table-search"
      type="search"
      @input="handleSearch"
    >
    <slot name="toolbar" :table="table" />
  </div>
</template>
