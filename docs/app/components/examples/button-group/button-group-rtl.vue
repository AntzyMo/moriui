<script setup lang="ts">
  import { MoreHorizontal } from '@lucide/vue'
  import { Button, ButtonGroup } from 'moriui'
</script>

<template>
  <div dir="rtl">
    <ButtonGroup aria-label="إجراءات الرسالة">
      <Button variant="outline">
        أرشفة
      </Button>
      <Button variant="outline">
        تقرير
      </Button>
      <Button size="icon" variant="outline" aria-label="المزيد">
        <MoreHorizontal />
      </Button>
    </ButtonGroup>
  </div>
</template>
