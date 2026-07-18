<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Label } from 'moriui'

  const checked = shallowRef(false)
</script>

<template>
  <div dir="rtl" class="flex items-center gap-2">
    <Checkbox id="terms-label-rtl" v-model="checked" dir="rtl" /><Label for="terms-label-rtl">قبول الشروط والأحكام</Label>
  </div>
</template>
