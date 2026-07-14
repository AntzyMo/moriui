<script setup lang="ts">
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>AlertDialog</h2>
    <div class="playground__row">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline">
            默认
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>你确定要继续吗？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作无法撤销。它将永久删除你的账户及服务器上的数据。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as-child>
              <Button variant="outline">
                取消
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction as-child>
              <Button>继续</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline">
            小号
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>允许配件连接吗？</AlertDialogTitle>
            <AlertDialogDescription>
              是否允许 USB 配件连接到这台设备？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as-child>
              <Button variant="outline">
                不允许
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction as-child>
              <Button>允许</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </section>
</template>
