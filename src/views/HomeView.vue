<template>
  <div class="min-h-screen bg-gradient-to-b from-[#2B1A4C] to-[#1F3C3D] flex flex-col items-center p-6 text-[#EDE1D1]">
    <!-- 问题表单 -->
    <QuestionForm v-if="questionFormVisible" @submitQuestion="onSubmitQuestion" />
    
    <!-- 牌堆 -->
    <TarotDeck v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QuestionForm from './components/QuestionForm.vue'
import TarotDeck from './components/TarotDeck.vue'

const questionFormVisible = ref(true)

const onSubmitQuestion = () => {
  questionFormVisible.value = false
}
</script>