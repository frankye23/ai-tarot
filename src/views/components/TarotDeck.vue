<template>
  <div class="tarot-deck flex flex-col items-center justify-center">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-[#D4AF37]">塔罗牌牌堆</h2>
      <p class="text-lg text-[#EDE1D1]">点击查看每张牌的详细信息</p>
    </div>
    <!-- 牌堆 -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
      <div
        v-for="card in tarotCards.cards"
        :key="card.number"
        class="relative bg-[#C79C57] rounded-lg shadow-lg p-4 hover:bg-[#B29D53] transition duration-300"
      >
        <div class="text-center">
          <div class="text-xl font-semibold text-[#2B1A4C] mb-2">{{ card.name }}</div>
          <div class="text-lg text-[#1F3C3D] mb-4">编号: {{ card.number }}</div>
          <div class="text-sm text-[#EDE1D1]">{{ card.arcana }}</div>
          <div v-if="card.suit" class="text-sm text-[#D4AF37] mt-2">花色: {{ card.suit }}</div>
        </div>

        <div class="absolute inset-0 bg-[#3D2C58] rounded-lg opacity-0 hover:opacity-100 transition duration-300">
          <p class="text-[#EDE1D1] text-center p-4">点击查看更多详情</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tarotCards from '@/assets/cards/tarot.json'
</script>