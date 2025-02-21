<template>
  <!-- <header class="w-full container mx-auto flex items-center justify-between px-24 py-4 text-white">
    <div class="flex items-center gap-24">
      <Logo />
      <NavMenu />
    </div>
    <div class="flex items-center gap-4">
      <button class="cursor-pointer w-24 px-4 py-1 bg-purple-500 rounded-lg hover:bg-purple-400">登录</button>
    </div>
  </header> -->
  <header class="p-4 flex justify-between items-center border-b border-gray-700">
    <h1 class="text-xl font-bold text-white">Tarot AI</h1>
    <nav class="space-x-4 text-white">
      <router-link to="/" class="hover:text-purple-400">Home</router-link>
      <router-link to="/reading" class="hover:text-purple-400">Get a Reading</router-link>
      <!-- <router-link to="/faq" class="hover:text-purple-400">FAQ</router-link>
      <router-link to="/blog" class="hover:text-purple-400">Blog</router-link> -->
      <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">Sign Up</button>
      <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Log In</button>
    </nav>
  </header>
</template>

<script setup>
import Logo from '@/components/base/Logo/index.vue'
import NavMenu from '@/components/base/NavMenu/index.vue'
</script>