<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Check, Copy, Star } from '@lucide/vue'
  import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from 'moriui'

  const copied = shallowRef(false)
  const favorite = shallowRef(false)
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupInput model-value="https://moriui.dev" readonly /><InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="复制" @click="copied = true">
          <Check v-if="copied" /><Copy v-else />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup><InputGroup>
      <InputGroupInput aria-label="页面地址" /><InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          :aria-pressed="favorite"
          aria-label="收藏"
          @click="favorite = !favorite"
        >
          <Star :class="{ 'fill-current': favorite }" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
