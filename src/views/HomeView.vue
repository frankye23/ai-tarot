<template>
  <div class="min-h-screen bg-gradient-to-b from-[#2B1A4C] to-[#1F3C3D] flex flex-col items-center p-6">
    <QuestionForm v-if="questionFormVisible" @submitQuestion="onSubmitQuestion" />
    <TarotDeck v-else :question="question" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QuestionForm from './components/QuestionForm.vue'
import TarotDeck from './components/TarotDeck.vue'

const questionFormVisible = ref(true)
const question = ref('') // 存储用户问题

const onSubmitQuestion = (userQuestion) => {
  question.value = userQuestion // 接收问题
  questionFormVisible.value = false
}
</script>
