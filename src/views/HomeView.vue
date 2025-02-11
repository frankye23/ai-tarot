<script setup>
import { ref } from 'vue'

const question = ref('')

const setQuestion = (text) => {
  question.value = text
}

const questions = [
  '最近经济状况是否会有好转？',
  '我近期的财运如何？',
  '投资能够实现盈利吗？',
  '我的财运在什么时候最好呢？',
  '近期会有获得意外之财的机会吗？'
]
</script>

<template>
  <div class="min-h-screen bg-blue-50 flex flex-col items-center p-6 text-gray-800">
    <!-- 输入框 -->
    <div class="w-full max-w-md">
      <label class="block text-lg mb-2 font-medium text-gray-700">请描述你的问题</label>
      <textarea
        v-model="question"
        class="w-full p-3 bg-white border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
        rows="2"
        placeholder="请输入你的问题..."
      ></textarea>
    </div>

    <!-- 提交按钮 -->
    <button class="mt-4 px-6 py-2 bg-green-400 text-white font-semibold rounded-full shadow-md hover:bg-green-500 transition">
      咨询塔罗师
    </button>

    <!-- 分类标签 -->
    <div class="mt-6 flex space-x-4">
      <button class="px-4 py-2 bg-blue-300 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition">财富</button>
      <button class="px-4 py-2 bg-blue-300 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition">感情</button>
      <button class="px-4 py-2 bg-blue-300 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition">事业</button>
      <button class="px-4 py-2 bg-blue-300 text-white rounded-full text-sm font-medium hover:bg-blue-400 transition">运势</button>
    </div>

    <!-- 常见问题 -->
    <div class="mt-6 w-full max-w-md">
      <h2 class="text-lg mb-3 font-medium text-gray-700">大家都在问</h2>
      <div class="space-y-3">
        <button
          v-for="(item, index) in questions"
          :key="index"
          @click="setQuestion(item)"
          class="w-full bg-white border border-blue-200 p-3 rounded-lg text-left text-gray-700 shadow-sm hover:bg-blue-100 transition"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
