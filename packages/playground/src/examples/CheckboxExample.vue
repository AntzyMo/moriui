<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox } from 'moriui'

  const checkboxValue = shallowRef(false)
  const indeterminateCheckboxValue = shallowRef<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <section class="playground__section">
    <h2>Checkbox</h2>
    <div class="playground__stack">
      <label class="playground__row w-fit cursor-pointer">
        <Checkbox id="playground-checkbox" v-model="checkboxValue" />
        <span>受控状态：{{ checkboxValue ? '已选中' : '未选中' }}</span>
      </label>
      <label class="playground__row w-fit cursor-pointer">
        <Checkbox id="playground-checkbox-indeterminate" v-model="indeterminateCheckboxValue" />
        <span>半选状态（点击后选中）</span>
      </label>
      <label class="playground__row w-fit cursor-pointer">
        <Checkbox aria-invalid="true" />
        <span>校验错误</span>
      </label>
      <label class="playground__row w-fit cursor-not-allowed">
        <Checkbox disabled />
        <span>不可用</span>
      </label>
      <label class="playground__row w-fit cursor-pointer">
        <Checkbox>
          <template #default="{ state }">
            <span aria-hidden="true">{{ state === 'indeterminate' ? '−' : '●' }}</span>
          </template>
        </Checkbox>
        <span>自定义指示符</span>
      </label>
    </div>
  </section>
</template>
