<script setup lang="ts">
import { ScrollArea, DirectionProvider } from 'moriui'
</script>
<template>
  <DirectionProvider dir="rtl">
    <ScrollArea class="h-56 w-64 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm leading-none font-medium">اتفاقية خدمة المستخدم</h4>
        <p class="mb-3 text-sm leading-relaxed">
          مرحباً بك في خدمتنا. هذه الاتفاقية هي اتفاقية قانونية بينك وبيننا فيما يتعلق باستخدام هذه الخدمة.
        </p>
        <hr class="my-2 border-t">
        <p class="mb-3 text-sm leading-relaxed">
          المادة الأولى: محتوى الخدمة - نقدم خدمات تشمل تخزين البيانات وتوزيع المحتوى والدعم الفني. المحتوى المحدد يخضع لما يتم تقديمه فعلياً.
        </p>
        <hr class="my-2 border-t">
        <p class="mb-3 text-sm leading-relaxed">
          المادة الثانية: التزامات المستخدم - يجب عليك الامتثال للقوانين واللوائح الوطنية عند استخدام هذه الخدمة، ولا يجوز استخدامها لأي أنشطة غير قانونية.
        </p>
        <hr class="my-2 border-t">
        <p class="mb-3 text-sm leading-relaxed">
          المادة الثالثة: الملكية الفكرية - جميع محتويات هذه الخدمة، بما في ذلك النصوص والصور والبرامج وتصميم الواجهة، مملوكة لنا.
        </p>
        <hr class="my-2 border-t">
        <p class="mb-3 text-sm leading-relaxed">
          المادة الرابعة: حماية الخصوصية - نحن نقدر خصوصيتك وسنجمع ونستخدم ونحمي معلوماتك الشخصية وفقاً لسياسة الخصوصية.
        </p>
        <hr class="my-2 border-t">
        <p class="mb-3 text-sm leading-relaxed">
          المادة الخامسة: إخلاء المسؤولية - لسنا مسؤولين عن انقطاع الخدمة بسبب القوة القاهرة أو الصيانة، ولكننا سنبذل قصارى جهدنا لتقليل التأثير.
        </p>
      </div>
    </ScrollArea>
  </DirectionProvider>
</template>
