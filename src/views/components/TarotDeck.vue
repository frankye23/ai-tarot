<template>
  <div class="w-full flex flex-col items-center min-h-screen mt-12">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-[#D4AF37]">塔罗牌牌堆</h2>
      <p class="text-lg text-[#EDE1D1]">点击抽牌查看详细信息</p>
      <p class="text-sm text-[#EDE1D1] mt-2">已抽取 {{ selectedCards.length }}/4 张</p>
    </div>

    <div class="flex flex-wrap gap-4 mb-24 min-h-[200px]">
      <div v-for="card in selectedCards" :key="card.name" class="w-[150px] h-[220px]">
        <TarotCard :card="card" :isSelected="isSelected(card)" />
        <div className="text-xl font-semibold text-center">{{card.name}}</div>
      </div>
    </div>

    <!-- 牌堆 -->
    <div v-if="selectedCards.length < 4" class="flex items-center relative mt-40 mb-24">
      <div v-for="(card, index) in tarotCards.cards" :key="index" 
        class="absolute right-56 transition-opacity duration-300"
        :class="{ 'opacity-0': isSelected(card) }"
        @click="drawCard(card)"
        :style="{ transform: `translateX(${index * 5}%)` }">
        <TarotCard :card="card" :isSelected="isSelected(card)" />
      </div>
    </div>

    <!-- 对话组件 -->
    <Chat v-else :question="question" :selectedCards="selectedCards" />
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { Motion } from 'motion-v'
import Chat from "./Chat/index.vue"
import tarotCards from '@/assets/cards/tarot.json'

const selectedCards = ref([]);
const props = defineProps(['question']); // 接收用户提的问题
const isSelected = (card) => selectedCards.value.includes(card);

const TarotCard = ({ card, isSelected }) => (
  <div className="bg-[#C79C57] rounded-lg shadow-sm p-4 w-[150px] h-[220px] relative overflow-hidden">
    <img
      src={isSelected ? `/tarot/${card.img}` : "/tarot/back.png"}
      alt={card.name}
      className="absolute inset-0 w-full h-full object-cover rounded-lg"
    />

    {!isSelected && (
      <div className="absolute inset-0 bg-[#3D2C58] rounded-lg opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center">
        <p className="text-[#EDE1D1] text-center">点击抽牌</p>
      </div>
    )}
  </div>
);

const drawCard = (card) => {
  if (selectedCards.value.length >= 4) return;
  selectedCards.value.push(card);
};

// TODO: 牌堆中卡牌的样式
const getCardStyle = (index, total) => {
  const maxAngle = 20;
  const angleStep = maxAngle / (total - 1);
  const angle = -maxAngle / 2 + index * angleStep;

  const yOffset = Math.abs(angle) * 2;

  return {
    transform: `translateX(${index * 5}%) translateY(${yOffset}px) rotate(${angle}deg)`,
  };
};
</script>