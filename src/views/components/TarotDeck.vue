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
        <div className="text-xl font-semibold text-center">{{ card.name }}</div>
      </div>
    </div>

    <!-- 牌堆 -->
    <div v-if="selectedCards.length < 4" class="flex items-center relative mt-40 mb-24">
      <div v-for="(card, index) in tarotCards.cards" :key="index" 
        class="absolute right-56 transition-opacity duration-300" :class="{ 'opacity-0': isSelected(card) }"
        :ref="el => cardRefs[index] = el" @click="drawCard(card)"  @mouseover="hoverCard(index, true)"
        @mouseleave="hoverCard(index, false)" :style="{ transform: `translateX(${index * 5}%)` }">
        <TarotCard :card="card" :isSelected="isSelected(card)" :isLoadingAnimation="isLoadingAnimation" :isHovered="hoveredIndex === index" />
      </div>
    </div>

    <!-- 对话组件 -->
    <Chat v-else :question="question" :selectedCards="selectedCards" />
 
    <div class="p-4 mt-12" v-if="selectedCards.length === 0 && !isLoadingAnimation">
      <button @click="shuffleCards" :disbaled="isLoadingAnimation"
        class="cursor-pointer bg-[#C79C57] hover:bg-[#D4AF37] text-[#3D2C58] font-semibold py-2 px-4 rounded-lg">
        洗牌
      </button>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref, onMounted } from 'vue'
import { Motion } from 'motion-v'
import anime from 'animejs/lib/anime.es.js';
import Chat from "./Chat/index.vue"
import tarotCards from '@/assets/cards/tarot.json'

const selectedCards = ref([]);
const cardRefs = ref([]);
const isLoadingAnimation = ref(false);
const hoveredIndex = ref(null); 
const props = defineProps(['question']); // 接收用户提的问题
const isSelected = (card) => selectedCards.value.includes(card);

const TarotCard = ({ card, isSelected, isLoadingAnimation, isHovered  }) => (
  <div className={`bg-white rounded-lg shadow-sm p-1 w-[150px] border h-[220px] relative overflow-hidden transition duration-300 ${isHovered ? 'transform translate-y-[-10px]' : ''}`}>
    <img
      src={isSelected ? `/tarot/${card.img}` : "/tarot/tarot_back.png"}
      alt={card.name}
      className="absolute inset-0 w-full h-full object-cover rounded-lg"
    />

    {!isSelected && !isLoadingAnimation && (
      <div className="absolute inset-0 bg-[#3D2C58] rounded-lg opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center">
        <p className="text-[#EDE1D1] text-center">点击抽牌</p>
      </div>
    )}
  </div>
);

const drawCard = (card) => {
  if (selectedCards.value.length >= 4 || isLoadingAnimation.value) return;
  
  selectedCards.value.push(card);

  tarotCards.value = tarotCards.value.filter(item => item.id !== card.id);
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

const shuffleCards = () => {
  isLoadingAnimation.value = true;
  // 模拟洗牌逻辑，打乱牌的顺序
  const shuffled = [...tarotCards.cards].sort(() => Math.random() - 0.5);
  tarotCards.cards = shuffled;
  const cards = cardRefs.value.filter(Boolean);
  // 1. 牌堆初始状态：把铺开的牌合起来
  anime({
    targets: cards,
    translateX: 200,
    translateY: 0,
    rotate: 0,
    duration: 500,
    easing: 'easeInOutQuad',
    complete: () => {
      // 2. 洗牌动画
      anime({
        targets: cards,
        translateX: () => (Math.random() * 400),
        translateY: () => (Math.random() * 400 - 200),
        rotate: () => (Math.random() * 360 - 180),
        opacity: [0, 1],
        duration: () => (Math.random() * 1000 + 500),
        delay: anime.stagger(100),
        easing: 'easeOutExpo',
        complete: () => {
          // 3. 牌堆重新铺开
          anime({
            targets: cards,
            translateX: (el, i) => (i * 5),
            translateY: (el, i) => {
              const maxAngle = 20;
              const angleStep = maxAngle / (cards.length - 1);
              const angle = -maxAngle / 2 + i * angleStep;
              return Math.abs(angle) * 2;
            },
            rotate: (el, i) => {
              const maxAngle = 20;
              const angleStep = maxAngle / (cards.length - 1);
              return -maxAngle / 2 + i * angleStep;
            },
            duration: 800,
            easing: 'easeOutQuart',
            complete: () => {
              // 4. 牌面旋转与恢复
              anime({
                targets: cards,
                rotateY: 0,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                  // 5. 完成动画
                  console.log('洗牌动画完成');
                  isLoadingAnimation.value = false;
                }
              });
            }
          });
        }
      });
    }
  });

  
};

const hoverCard = (index, isHovered) => {
  hoveredIndex.value = isHovered ? index : null;
};

onMounted(() => {
  // 确保 cardRefs 数组长度和卡牌数量一致
  cardRefs.value = Array(tarotCards.cards.length).fill(null);
});
</script>