<template>
  <div>
    <footer>
      <div
        class="mx-auto max-w-5xl px-6 py-4 sm:py-8 flex items-center justify-center lg:px-8 border-t-[0.5px] border-indigo-600/[0.1]">
        <div class="mt-8 mb-4 sm:mb-0 sm:order-1 sm:mt-0">
          <p class="text-center text-xs leading-5 text-slate-400">
            &copy; {{ rights }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const rights = '2025 HELLO_WORLD, Inc. All rights reserved.'
</script>