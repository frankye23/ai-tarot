<template>
  <div
    :class="[
      'max-w-3xl px-4 py-3 rounded-lg text-white',
      isUser ? 'bg-purple-600 text-right' : 'bg-gray-700 text-left'
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  isUser: Boolean // 是否是用户的消息
});
</script>
