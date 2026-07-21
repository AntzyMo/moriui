<script setup lang="ts">
  import { ChevronLeft, ChevronRight } from '@lucide/vue'
  import {
    Field,
    FieldLabel,
    Pagination,
    PaginationList,
    PaginationNext,
    PaginationPrev,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue

  } from 'moriui'
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <Field orientation="horizontal" class="w-fit">
      <FieldLabel>每页行数</FieldLabel>
      <Select default-value="25">
        <SelectTrigger class="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            <SelectItem value="10">
              10
            </SelectItem>
            <SelectItem value="25">
              25
            </SelectItem>
            <SelectItem value="50">
              50
            </SelectItem>
            <SelectItem value="100">
              100
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
    <Pagination class="mx-0 w-auto">
      <PaginationList>
        <PaginationPrev><ChevronLeft class="size-4" /></PaginationPrev>
        <PaginationNext><ChevronRight class="size-4" /></PaginationNext>
      </PaginationList>
    </Pagination>
  </div>
</template>
