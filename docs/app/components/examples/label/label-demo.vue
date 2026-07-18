<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Label } from 'moriui'

  const checked = shallowRef(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms-label" v-model="checked" /><Label for="terms-label">接受条款与条件</Label>
  </div>
</template>
