<template>
  <nav class="flex items-center space-x-12">
    <a v-for="(item, index) in menuItems" :key="index" :href="item.link" class="hover:text-gray-400 font-semibold text-lg">
      {{ item.label }}
    </a>
  </nav>
</template>

<script setup>
const menuItems = [
  { label: '首页', link: '/' },
  { label: 'AI塔罗占卜', link: '/ai' },
]
</script>
