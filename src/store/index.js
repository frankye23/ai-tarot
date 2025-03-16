import { createPinia } from 'pinia'

import { useQuestionStore } from './modules/question'

const pinia = createPinia()

export { useQuestionStore }
export default pinia