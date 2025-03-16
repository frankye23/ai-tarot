<template>
  <div class="min-h-screen bg-gradient-to-b from-[#2B1A4C] to-[#1F3C3D] flex flex-col items-center p-6">
    <QuestionForm @submitQuestion="onSubmitQuestion" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionStore } from '../store'
import QuestionForm from './components/QuestionForm.vue'

const router = useRouter()
const questionFormVisible = ref(true)
const question = ref('') // 存储用户问题
const questionStore = useQuestionStore()

const onSubmitQuestion = (userQuestion) => {
  question.value = userQuestion // 接收问题
  questionFormVisible.value = false

  questionStore.setQuestion(question.value)
  router.push('/reading')
}
</script>