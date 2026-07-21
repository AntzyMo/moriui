<script setup lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DirectionProvider
  } from 'moriui'
</script>

<template>
  <DirectionProvider dir="rtl">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          فتح
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>حوار</DialogTitle>
          <DialogDescription>هذا حوار في الاتجاه من اليمين إلى اليسار.</DialogDescription>
        </DialogHeader>
        <p class="text-sm text-muted-foreground">
          محتوى الحوار هنا.
        </p>
      </DialogContent>
    </Dialog>
  </DirectionProvider>
</template>
