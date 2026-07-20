<script setup lang="ts">
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, DirectionProvider } from 'moriui'

const actions = ['فتح', 'حفظ', 'طباعة', 'بحث']
</script>
<template>
  <DirectionProvider direction="rtl">
    <Command class="rounded-lg border shadow-sm w-full max-w-sm" dir="rtl">
      <CommandInput placeholder="ابحث عن أمر…" />
      <CommandList>
        <CommandEmpty>لا توجد نتائج</CommandEmpty>
        <CommandGroup heading="الإجراءات">
          <CommandItem v-for="item in actions" :key="item" :value="item">
            {{ item }}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </DirectionProvider>
</template>
