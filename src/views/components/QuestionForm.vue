<template>
  <main class="py-12 px-4">
    <section
      class="max-w-6xl h-[500px] mx-auto text-center relative rounded-lg bg-cover bg-center bg-no-repeat bg-[url(../assets/test2.jpg)]">
      <div class="relative z-10 flex items-center justify-center h-full p-4">
        <div class="text-center">
          <h2 class="text-4xl font-bold mb-4">Get a Reading</h2>
          <p class="text-gray-500 mb-6 font-semibold">Whether you want to dive into the past, present, or future, our AI can help you
            uncover insights.</p>
          <div class="mx-auto relative flex items-center justify-start space-x-4 mb-8 w-3/4">
            <input type="text" v-model="question" placeholder="What's your question?"
              class="w-full p-3 bg-gray-300 rounded-lg focus:outline-none shadow-md pr-20 py-6 pl-4">
            <button @click="submitQuestion"
              class="absolute right-10 bg-[#5e17ce] hover:bg-purple-700 text-white px-6 py-2 rounded-lg cursor-pointer">
              Start Reading
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 分类按钮 -->
    <div class="mt-12 flex space-x-4 max-w-6xl mx-auto">
      <h2 class="font-medium text-gray-400 flex items-center"><SvgIcon class="size-4 text-white mr-1" icon="ic:twotone-question-answer" />大家都在问</h2>

      <button v-for="key in categoryKeys" :key="key" @click="selectedCategory = key"
        class="cursor-pointer px-2 h-6 leading-6 rounded-sm text-sm font-medium transition-all duration-200" :class="{
          'bg-[#5e17ce] text-white shadow-md': selectedCategory === key,
          'text-white hover:bg-[#F5F5F5] hover:text-[#5e17ce]': selectedCategory !== key
        }">
        {{ categories[key] }}
      </button>
    </div>

    <!-- 常见问题 -->
    <div class="mt-6 w-full max-w-6xl mx-auto">
      <div class="space-y-3">
        <button v-for="(item, index) in questions" :key="index" @click="setQuestion(item)"
          class="cursor-pointer w-full bg-white border border-gray-200 p-3 rounded-lg text-sm text-left text-[#3D2C58] shadow-md hover:bg-[#F5F5F5] hover:shadow-lg transition-all duration-200">
          {{ item }}
        </button>
      </div>
    </div>

    <!-- How It Works Section -->
    <section class="max-w-6xl mx-auto mt-12">
      <h2 class="text-4xl font-bold mb-6 text-white">How it works</h2>
      <p class="text-gray-400 mb-6 font-semibold">Our AI-powered card reader uses DeepSeek / Grok3 / GPT4  to provide in-depth insights on relationships,
        career, finances, and more. Simply ask a question and let the cards guide you.</p>
      <button class="bg-[#5e17ce] hover:bg-purple-700 text-white px-6 py-2 rounded-lg mb-8 cursor-pointer">Get a
        Reading</button>

      <!-- Reading Options -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gray-800 p-4 rounded-lg">
          <SvgIcon class="size-6 text-white" icon="ic:baseline-calendar-month" />

          <h3 class="text-xl font-semibold my-2 text-white">Daily Read</h3>
          <p class="text-gray-400">Get a free daily reading</p>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg">
          <SvgIcon class="size-6 text-white" icon="ic:round-access-alarms" />

          <h3 class="text-xl font-semibold my-2 text-white">Instant Read</h3>
          <p class="text-gray-400">Ask a question and receive an instant response</p>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg">
          <SvgIcon class="size-6 text-white" icon="ic:baseline-card-giftcard" />

          <h3 class="text-xl font-semibold my-2 text-white">Gift a Read</h3>
          <p class="text-gray-400">Surprise a loved one with a personalized tarot reading</p>
        </div>
      </div>

      <!-- Tarot Card Images -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <img src="../../assets/card_background1.jpg" alt="Tarot Cards"
          class="rounded-lg object-cover w-full h-60 aspect-square">
        <img src="../../assets/card_background2.jpg" alt="Tarot Cards"
          class="rounded-lg object-cover w-full h-60 aspect-square">
        <img src="../../assets/card_background3.jpg" alt="Tarot Cards"
          class="rounded-lg object-cover w-full h-60 aspect-square">
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import SvgIcon from '../../components/base/SvgIcon/index.vue'
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
