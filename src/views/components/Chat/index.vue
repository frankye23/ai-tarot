<template>
  <div v-if="!isAnswered" class="text-center">
    <button @click="getTarotAnswers"
      class="cursor-pointer bg-[#C79C57] hover:bg-[#D4AF37] text-[#3D2C58] font-semibold py-2 px-4 rounded-lg">
      立即占卜
    </button>
  </div>

  <div v-else class="px-12 py-6 space-y-4 max-w-4xl mx-auto text-white rounded-lg">
    <ChatMessage v-for="(msg, index) in messages" :key="index" :avatar="msg.avatar" :isUser="msg.isUser">
      <template v-if="msg.loading">
        <div class="animate-pulse flex space-x-2">
          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </template>
      <template v-else>
        {{ msg.text }}
      </template>
    </ChatMessage>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { generateDialog } from '@/api/index.js'
import { useEventStream } from '../../../utils/useEventStream';
import ChatMessage from './ChatMessage.vue'
import userAvatar from '@/assets/error.svg'
import assistantAvatar from '@/assets/check.svg'

const props = defineProps(['question', 'selectedCards'])
const MESSAGE_ID = 1
const messages = ref([{ text: props.question, isUser: true, avatar: userAvatar }])
const isAnswered = ref(false)
const { createEventStream } = useEventStream();

const getTarotAnswers = async () => {
  if (isAnswered.value) return
  isAnswered.value = true

  try {
    const selectedCardNames = props.selectedCards.map(card => card.name).join('、')
    const promptMsg = `请你扮演一位塔罗占卜师，使用圣三角牌阵为我占卜。我抽到了四张牌，抽到的是${selectedCardNames}，我想问的问题是：${props.question}，禁止在回答中出现任何英语单词，包括塔罗牌名。也就是牌名直接翻译好告诉我。直接回答问题，不需要解析牌阵结构。`

    const loadingMessage = { text: '思考中...', isUser: false, avatar: assistantAvatar, loading: true }
    messages.value.push(loadingMessage)

    const controller = new AbortController();
    
    // // 发起事件流请求
    createEventStream(MESSAGE_ID, 'deepseek-v3', 'your-auth-token', messages.value, promptMsg, controller);

    controller.signal.onabort = () => {
      messages.value = messages.value.filter(msg => msg !== loadingMessage);
      messages.value.push({ text: '抱歉，解读失败，请稍后再试。', isUser: false, avatar: assistantAvatar });
    }
  } catch (error) {
    console.error('Failed to send message:', error)
  }


  // try {
  //   const response = await generateDialog({ message: promptMsg })
  //   const aiResponse = response.data.choices[0].message.content

  //   messages.value = messages.value.filter(msg => msg !== loadingMessage)

  //   messages.value.push({ text: aiResponse, isUser: false, avatar: assistantAvatar })
  // } catch (error) {
  //   messages.value = messages.value.filter(msg => msg !== loadingMessage)

  //   messages.value.push({ text: '抱歉，解读失败，请稍后再试。', isUser: false, avatar: assistantAvatar })
  // }
  

}

</script>