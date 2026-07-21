<script setup lang="ts">
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, DirectionProvider } from 'moriui'
</script>

<template>
  <DirectionProvider dir="rtl">
    <Accordion default-value="item-1" class="max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>كيف يمكنني إعادة تعيين كلمة المرور؟</AccordionTrigger>
        <AccordionContent>
          انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول، أدخل عنوان بريدك الإلكتروني، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور. سينتهي صلاحية الرابط خلال 24 ساعة.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>هل يمكنني تغيير خطة الاشتراك الخاصة بي؟</AccordionTrigger>
        <AccordionContent>
          نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت من إعدادات حسابك. ستظهر التغييرات في دورة الفوترة التالية.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>ما هي طرق الدفع التي تقبلونها؟</AccordionTrigger>
        <AccordionContent>
          نقبل جميع بطاقات الائتمان الرئيسية و PayPal والتحويلات المصرفية. تتم معالجة جميع المدفوعات بأمان من خلال شركاء الدفع لدينا.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </DirectionProvider>
</template>
