<script setup lang="ts">
  import { Button, ButtonGroup } from 'moriui'
</script>

<template>
  <div class="grid gap-4">
    <ButtonGroup>
      <Button size="sm" variant="outline">
        小号
      </Button><Button size="sm" variant="outline">
        组合
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button variant="outline">
        默认
      </Button><Button variant="outline">
        组合
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button size="lg" variant="outline">
        大号
      </Button><Button size="lg" variant="outline">
        组合
      </Button>
    </ButtonGroup>
  </div>
</template>
