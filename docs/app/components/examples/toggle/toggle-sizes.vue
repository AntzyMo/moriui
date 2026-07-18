<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'

  const small = shallowRef(false)
  const normal = shallowRef(true)
  const large = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Toggle
      v-model="small"
      aria-label="切换小号"
      size="sm"
      variant="outline"
    >
      小号
    </Toggle>
    <Toggle v-model="normal" aria-label="切换默认" variant="outline">
      默认
    </Toggle>
    <Toggle
      v-model="large"
      aria-label="切换大号"
      size="lg"
      variant="outline"
    >
      大号
    </Toggle>
  </div>
</template>
