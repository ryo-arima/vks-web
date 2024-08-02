// src/App.vue
<template>
  <div>
    <JavaGraph></JavaGraph>
  </div>
</template>

<script>
import JavaGraph from '@/components/JavaGraph.vue'

export default {
  name: 'JavaPage',
  components: {
    JavaGraph
  }
};
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>
