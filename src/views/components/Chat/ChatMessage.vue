<template>
  <div class="flex items-start gap-3" :class="isUser ? 'flex-row-reverse' : ''">
    <!-- 头像 -->
    <img
      :src="avatar"
      alt="avatar"
      class="w-10 h-10 rounded-full border border-gray-500"
    />

    <!-- 气泡 -->
    <ChatBubble :isUser="isUser">
      <slot />
    </ChatBubble>
  </div>
</template>

<script setup>
import ChatBubble from './ChatBubble.vue';

defineProps({
  avatar: String, // 头像 URL
  isUser: Boolean // 是否是用户的消息
});
</script>
