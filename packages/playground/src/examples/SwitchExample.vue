<script setup lang="ts">
  import { Switch } from 'moriui'
  import { shallowRef } from 'vue'

  const enabled = shallowRef(false)
</script>

<template>
  <section class="playground__section">
    <h2>Switch</h2>
    <div class="playground__stack">
      <label class="playground__row w-fit cursor-pointer" for="playground-switch">
        <Switch id="playground-switch" v-model="enabled" />
        <span>受控状态：{{ enabled ? '已启用' : '未启用' }}</span>
      </label>
      <label class="playground__row w-fit cursor-pointer" for="playground-switch-sm">
        <Switch id="playground-switch-sm" size="sm" />
        <span>小尺寸</span>
      </label>
      <label class="playground__row w-fit cursor-pointer" for="playground-switch-invalid">
        <Switch id="playground-switch-invalid" aria-invalid="true" />
        <span>校验错误</span>
      </label>
      <label class="playground__row w-fit cursor-not-allowed" for="playground-switch-disabled">
        <Switch id="playground-switch-disabled" disabled />
        <span>不可用</span>
      </label>
      <label class="playground__row w-fit cursor-pointer" for="playground-switch-custom">
        <Switch id="playground-switch-custom">
          <template #thumb="{ checked }">
            <span aria-hidden="true">{{ checked ? '✓' : '·' }}</span>
          </template>
        </Switch>
        <span>自定义 Thumb</span>
      </label>
    </div>
  </section>
</template>
