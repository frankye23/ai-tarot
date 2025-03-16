import { defineStore } from 'pinia'

export const useQuestionStore = defineStore(
  'question',
  {
    state: () => ({
      question: '',
    }),
    getters: {
      getQuestion: (state) => state.question,
      
    },
    actions: {
      setQuestion(question) {
        this.question = question
      },
      
    },
  },
)