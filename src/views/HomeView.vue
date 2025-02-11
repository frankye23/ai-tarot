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
  <div class="min-h-screen bg-gradient-to-b from-[#2B1A4C] to-[#1F3C3D] flex flex-col items-center p-6 text-[#EDE1D1]">
    <!-- 输入框 -->
    <div class="w-full max-w-md">
      <label class="block text-lg mb-2 font-medium text-[#D4AF37]">请描述你的问题</label>
      <textarea
        v-model="question"
        class="w-full p-3 bg-[#3D2C58] border border-[#C79C57] rounded-lg text-[#EDE1D1] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-md"
        rows="2"
        placeholder="请输入你的问题..."
      ></textarea>
    </div>

    <!-- 提交按钮 -->
    <button class="mt-4 px-6 py-2 bg-[#8B0000] text-[#EDE1D1] font-semibold rounded-full shadow-lg border border-[#C79C57] hover:bg-[#9C2424] hover:shadow-2xl transition duration-300">
      🔮 咨询塔罗师
    </button>

    <!-- 分类标签 -->
    <div class="mt-6 flex space-x-4">
      <button class="px-4 py-2 bg-[#C79C57] text-[#2B1A4C] rounded-full text-sm font-medium border border-[#D4AF37] hover:bg-[#D4AF37] transition">财富</button>
      <button class="px-4 py-2 bg-[#C79C57] text-[#2B1A4C] rounded-full text-sm font-medium border border-[#D4AF37] hover:bg-[#D4AF37] transition">感情</button>
      <button class="px-4 py-2 bg-[#C79C57] text-[#2B1A4C] rounded-full text-sm font-medium border border-[#D4AF37] hover:bg-[#D4AF37] transition">事业</button>
      <button class="px-4 py-2 bg-[#C79C57] text-[#2B1A4C] rounded-full text-sm font-medium border border-[#D4AF37] hover:bg-[#D4AF37] transition">运势</button>
    </div>

    <!-- 常见问题 -->
    <div class="mt-6 w-full max-w-md">
      <h2 class="text-lg mb-3 font-medium text-[#D4AF37]">大家都在问</h2>
      <div class="space-y-3">
        <button
          v-for="(item, index) in questions"
          :key="index"
          @click="setQuestion(item)"
          class="w-full bg-[#3D2C58] border border-[#C79C57] p-3 rounded-lg text-left text-[#EDE1D1] shadow-md hover:bg-[#4C376D] transition"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>
