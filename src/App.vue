<script setup lang="ts">
import BackToTop from './components/BackToTop.vue';
import PokemonSearchBar from './components/PokemonSearchBar.vue';

</script>

<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <header class="bg-red-400 text-white p-6 mb-4">
    <div class="container flex flex-col md:flex-row mx-auto items-center justify-between gap-4">
      <router-link to="/">
      <h1 class="text-3xl font-bold tracking-wider flex items-center gap-2">
        <span class="bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokeball"
          />
        </span>
        Vue Pokedex
      </h1>
      </router-link>

      <div class="w-full md:flex-1 flex justify-center md:justify-end">
        <PokemonSearchBar class="w-full max-w-md"/>
      </div>
    </div>
    </header>

    <router-view />
    <BackToTop />
    <main class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
      </div>
    </main>

    <footer class="mt-20 pb-10 text-center text-slate-400 text-sm">
  <div class="flex justify-center gap-4 mb-3">
    <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
    <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
    <div class="w-2 h-2 bg-green-400 rounded-full"></div>
  </div>
  <p class="font-medium">Open Source Project</p>
  <p class="text-xs opacity-75 mt-0.5">Vue 3, TypeScript & Tailwind CSS</p>
  <div class="mt-4 flex justify-center gap-6 font-medium">
    <a href="https://github.com/JohannesL2/vue-pokedex" 
       target="_blank" 
       class="hover:text-red-500 transition-colors duration-300 border-b border-transparent hover:border-red-500">
      GitHub Repository →
    </a>
    <a href="https://github.com/JohannesL2/vue-pokedex/blob/main/LICENSE" 
       target="_blank" 
       class="hover:text-slate-200 transition-colors duration-300">
      MIT License
    </a>
  </div>
</footer>
  </div>
</template>
