<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const isVisible = ref(false);
const scrollThreshold = 300;

const updateVisibility = () => {
  isVisible.value = window.scrollY > scrollThreshold;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility);
});
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-3 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-3 scale-90"
  >
    <button
      v-show="isVisible"
      type="button"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-red-500 text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600 hover:shadow-red-500/40 focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95 md:bottom-8 md:right-8 md:h-14 md:w-14 cursor-pointer transition-background duration-150"
      @click="scrollToTop"
    >
      <svg
        class="relative h-6 w-6"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M12 19V5m0 0-7 7m7-7 7 7"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>
