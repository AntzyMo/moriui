<script setup lang="ts">
  import { Button } from 'moriui'
  import { ArrowRight, Plus } from '@lucide/vue'
</script>

<template>
  <div dir="rtl" class="flex flex-wrap items-center gap-2">
    <Button variant="outline">
      زر
    </Button>
    <Button variant="destructive">
      حذف
    </Button>
    <Button variant="outline">
      إرسال<ArrowRight class="rtl:rotate-180" data-icon="inline-end" />
    </Button>
    <Button size="icon" variant="outline" aria-label="إضافة">
      <Plus />
    </Button>
  </div>
</template>
