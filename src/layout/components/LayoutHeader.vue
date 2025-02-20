<template>
  <header class="w-full container mx-auto flex items-center justify-between px-24 py-4 text-white">
    <div class="flex items-center gap-24">
      <Logo />
      <NavMenu />
    </div>
    <div class="flex items-center gap-4">
      <button class="cursor-pointer w-24 px-4 py-1 bg-purple-500 rounded-lg hover:bg-purple-400">登录</button>
    </div>
  </header>
</template>

<script setup>
import Logo from '@/components/base/Logo/index.vue'
import NavMenu from '@/components/base/NavMenu/index.vue'
</script>