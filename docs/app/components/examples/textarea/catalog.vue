<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Textarea } from 'moriui'

  const note = shallowRef('记录下一步行动…')
</script>

<template>
  <Textarea
    v-model="note"
    aria-label="行动备注"
    class="w-40"
    rows="2"
  />
</template>
