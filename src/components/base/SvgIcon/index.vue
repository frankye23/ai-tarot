<script setup>
import { computed, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'

defineProps()

const attrs = useAttrs()

const bindAttrs = computed(() => ({
  class: attrs.class || '',
  style: attrs.style || '',
}))
</script>

<template>
  <Icon
    :icon="icon"
    v-bind="bindAttrs" />
</template>