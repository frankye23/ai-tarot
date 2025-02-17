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

    <button @click="submitQuestion" class="cursor-pointer mt-4 px-6 py-2 bg-[#8B0000] text-[#EDE1D1] font-semibold rounded-full shadow-lg border border-[#C79C57] hover:bg-[#9C2424] hover:shadow-2xl transition duration-300">
      🔮 咨询塔罗师
    </button>

    <!-- 分类按钮 -->
    <div class="mt-6 flex space-x-4">
      <button
        v-for="key in categoryKeys"
        :key="key"
        @click="selectedCategory = key"
        class="px-4 py-2 rounded-full text-sm font-medium border transition"
        :class="{
          'bg-[#D4AF37] text-[#2B1A4C] border-[#C79C57]': selectedCategory === key,
          'bg-[#C79C57] text-[#2B1A4C] border-[#D4AF37] hover:bg-[#D4AF37]': selectedCategory !== key
        }"
      >
        {{ categories[key] }}
      </button>
    </div>

    <!-- 常见问题 -->
    <div class="mt-6 w-full max-w-md">
      <h2 class="text-lg mb-3 font-medium text-[#D4AF37]">大家都在问</h2>
      <div class="space-y-3">
        <button
          v-for="(item, index) in questions"
          :key="index"
          @click="setQuestion(item)"
          class="cursor-pointer w-full bg-[#3D2C58] border border-[#C79C57] p-3 rounded-lg text-left text-[#EDE1D1] shadow-md hover:bg-[#4C376D] transition"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['submitQuestion'])

const question = ref('')
const selectedCategory = ref('wealth')

const categories = {
  wealth: '财富',
  love: '感情',
  career: '事业',
  fortune: '运势'
}

const categoryQuestions = {
  wealth: [
    '最近经济状况是否会有好转？',
    '我近期的财运如何？',
    '投资能够实现盈利吗？',
    '我的财运在什么时候最好呢？',
    '近期会有获得意外之财的机会吗？'
  ],
  love: [
    '我们近期会复合吗？',
    '我最近的桃花运如何？会脱单吗？',
    '我和TA结婚会幸福吗？',
    'TA出轨了，TA是怎么想的呢？',
    '我们能在一起吗？'
  ],
  career: [
    '近期我会有升职加薪的机会吗？',
    '我会遇到贵人吗？',
    '我打算跳槽，会成功吗？',
    '现阶段适合创业吗？',
    '可以找到心仪的工作吗？'
  ],
  fortune: [
    '我近三个月的整体运势如何？',
    '短期内我的感情运势如何？会有变化吗？',
    '未来３个月工作会稳定顺利吗？',
    '最近的财运怎么样？',
    '我和TA未来发展如何？'
  ]
}

const categoryKeys = Object.keys(categories)

const questions = computed(() => categoryQuestions[selectedCategory.value])

const setQuestion = (text) => {
  question.value = text
}

const submitQuestion = () => {
  if (!question.value) return
  emit('submitQuestion', question.value)
}
</script>
