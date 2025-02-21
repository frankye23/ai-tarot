<script lang="ts" setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <div class="w-full min-h-full font-nunito">
    <div class="min-h-screen flex flex-col justify-between">
      <div class="bg-black">
        <LayoutHeader />
        <main>
          <router-view />
        </main>
        <LayoutFooter />
      </div>
    </div>
  </div>
</template>