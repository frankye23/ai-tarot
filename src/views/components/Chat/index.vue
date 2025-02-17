<template>
  <div class="px-12 py-6 space-y-4 max-w-4xl mx-auto text-white rounded-lg">
    <ChatMessage v-for="(msg, index) in messages" :key="index" :avatar="msg.avatar" :isUser="msg.isUser">
      {{ msg.text }}
    </ChatMessage>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { generateDialog } from '@/api/index.js'
import ChatMessage from './ChatMessage.vue'
import userAvatar from '@/assets/error.svg'
import assistantAvatar from '@/assets/check.svg'

const props = defineProps(['question', 'selectedCards'])

const messages = ref([
  { text: props.question, isUser: true, avatar: userAvatar }
])

const getTarotAnswers = async () => {
  const selectedCardNames = props.selectedCards.map(card => card.name).join('、');
  const promptMsg = `请你扮演一位塔罗占卜师，使用圣三角牌阵为我占卜。我抽到了四张牌，抽到的是${selectedCardNames}，我想问的问题是：${props.question}，禁止在回答中出现任何英语单词，包括塔罗牌名。也就是牌名直接翻译好告诉我。直接回答问题，不需要解析牌阵结构。`;

  try {
    const data = {
      message: promptMsg,
    }
    const response = await generateDialog(data)

    const aiResponse = response.data.choices[0].message.content
    messages.value.push({ text: aiResponse, isUser: false, avatar: assistantAvatar })
  } catch (error) {
    messages.value.push({ text: '抱歉，解读失败，请稍后再试。', isUser: false, avatar: assistantAvatar })
  }
}

onMounted(async () => {
  await getTarotAnswers()
})
</script>
