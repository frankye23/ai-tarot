<template>
  <div class="text-lg font-bold flex items-center cursor-pointer" @click="goto">
    <img src="../../../assets/vue.svg" alt="ai-tarot" class="h-6 mr-2" />
    AI Tarot
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goto = () => {
  router.push('/')
}
</script>