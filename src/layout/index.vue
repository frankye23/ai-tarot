<script lang="ts" setup>
import LayoutHeader from './components/LayoutHeader.vue'
// import LayoutFooter from '@/layout/components/layout-footer/index.vue'
</script>

<template>
  <div class="w-full min-h-full font-nunito">
    <div class="min-h-screen flex flex-col justify-between">
      <div class="bg-black">
        <LayoutHeader />
        <main>
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>