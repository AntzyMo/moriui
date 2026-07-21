<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ChevronsUpDown } from '@lucide/vue'
  import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, DirectionProvider } from 'moriui'

  const isOpen = shallowRef(false)
</script>

<template>
  <DirectionProvider dir="rtl">
    <Collapsible
      v-model:open="isOpen"
      class="flex w-[350px] flex-col gap-2"
    >
      <div class="flex items-center justify-between gap-4 px-4">
        <h4 class="text-sm font-semibold">
          الطلب #4189
        </h4>
        <CollapsibleTrigger as-child>
          <Button variant="ghost" size="icon" class="size-8">
            <ChevronsUpDown />
            <span class="sr-only">تبديل التفاصيل</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div class="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
        <span class="text-muted-foreground">الحالة</span>
        <span class="font-medium">تم الشحن</span>
      </div>
      <CollapsibleContent class="flex flex-col gap-2">
        <div class="rounded-md border px-4 py-2 text-sm">
          <p class="font-medium">
            عنوان الشحن
          </p>
          <p class="text-muted-foreground">
            شارع الاستقلال، الرياض
          </p>
        </div>
        <div class="rounded-md border px-4 py-2 text-sm">
          <p class="font-medium">
            المنتجات
          </p>
          <p class="text-muted-foreground">
            2x سماعات رأس
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </DirectionProvider>
</template>
