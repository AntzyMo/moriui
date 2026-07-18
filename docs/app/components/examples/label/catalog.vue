<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Label } from 'moriui'

  const checked = shallowRef(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="label-catalog" v-model="checked" /><Label for="label-catalog">接受条款</Label>
  </div>
</template>
