<script setup lang="ts">
  import { X } from '@lucide/vue'
  import { shallowRef } from 'vue'
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText
  } from 'moriui'

  const website = shallowRef('https://moriui.dev')
</script>

<template>
  <section class="playground__section">
    <h2>InputGroup</h2>
    <div class="playground__stack">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput v-model="website" aria-label="网站地址" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="清空地址" size="icon-xs" @click="website = ''">
            <X aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>项目地址</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput default-value="packages/core" aria-label="项目地址" />
        <InputGroupAddon align="block-end">
          <InputGroupText>相对于仓库根目录</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput disabled default-value="moriui" aria-label="不可用用户名" />
      </InputGroup>
    </div>
  </section>
</template>
