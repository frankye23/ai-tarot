<template>
  <div class="w-full flex flex-col items-center justify-center min-h-screen">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-[#D4AF37]">塔罗牌牌堆</h2>
      <p class="text-lg text-[#EDE1D1]">点击抽牌查看详细信息</p>
      <p class="text-sm text-[#EDE1D1] mt-2">已抽取 {{ selectedCards.length }}/4 张</p>
    </div>

    <!-- 抽出的牌展示区 -->
    <div class="flex flex-wrap gap-4 mb-8 min-h-[200px]">
      <Motion v-for="card in selectedCards" :key="card.name" :initial="{ y: 100, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }" class="w-[150px] h-[220px]">
        <TarotCard :card="card" />
      </Motion>
    </div>

    <!-- 牌堆容器 -->
    <div class="flex items-center relative mt-40">
      <div v-for="(card, index) in tarotCards.cards" :key="index" class="absolute right-56" @click="drawCard(card)"
        :style="{ transform: `translateX(${index * 5}%)` }">
        <TarotCard :card="card" />
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { Motion } from 'motion-v'
import tarotCards from '@/assets/cards/tarot.json'

// TODO: 打乱 tarotCards.cards

const TarotCard = ({ card }) => (
  <div className="bg-[#C79C57] rounded-lg shadow-lg p-4 w-[150px] h-[220px] transform preserve-3d">
    <div className="text-center">
      <div className="text-xl font-semibold text-[#2B1A4C] mb-2">{card.name}</div>
      <div className="text-lg text-[#1F3C3D] mb-4">编号: {card.number}</div>
      <div className="text-sm text-[#EDE1D1]">{card.arcana}</div>
      {card.suit && (
        <div className="text-sm text-[#D4AF37] mt-2">花色: {card.suit}</div>
      )}
    </div>
    <div className="absolute inset-0 bg-[#3D2C58] rounded-lg opacity-0 hover:opacity-100 transition duration-300">
      <p className="text-[#EDE1D1] text-center p-4">点击抽牌</p>
    </div>
  </div>
);

const selectedCards = ref([])

const drawCard = (card) => {
  if (selectedCards.value.length >= 4) return
  if (!card.selected) {
    card.selected = true
    selectedCards.value.push(card)
  }
}
</script>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}
</style>