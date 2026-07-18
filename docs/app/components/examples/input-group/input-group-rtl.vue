<script setup lang="ts">
  import { Search } from '@lucide/vue'
  import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, Spinner } from 'moriui'
</script>

<template>
  <div dir="rtl" class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupInput dir="rtl" aria-label="بحث" placeholder="بحث…" /><InputGroupAddon><Search /></InputGroupAddon><InputGroupAddon align="inline-end">
        ١٢ نتيجة
      </InputGroupAddon>
    </InputGroup><InputGroup>
      <InputGroupInput dir="rtl" aria-label="حالة الحفظ" placeholder="جاري حفظ التغييرات…" /><InputGroupAddon align="inline-end">
        <InputGroupText>جاري الحفظ</InputGroupText><Spinner />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
