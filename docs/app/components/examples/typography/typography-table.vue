<script setup lang="ts">
  import { Typography } from 'moriui'
</script>

<template>
  <div class="w-full max-w-md overflow-hidden rounded-lg border">
    <Typography as="table" class="w-full text-sm">
      <thead class="bg-muted">
        <tr>
          <th class="p-2 text-left">
            组件
          </th>
          <th class="p-2 text-left">
            状态
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-2">
            Button
          </td>
          <td class="p-2">
            稳定
          </td>
        </tr>
        <tr class="border-t">
          <td class="p-2">
            Card
          </td>
          <td class="p-2">
            稳定
          </td>
        </tr>
      </tbody>
    </Typography>
  </div>
</template>
