<script setup lang="ts">
import PokemonList from '@/components/PokemonList.vue';

</script>

<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <header class="bg-red-400 text-white p-6 mb-8">
    <div class="container flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-wider flex items-center gap-2">
        <span class="bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokeball"
          />
        </span>
        Vue Pokedex
      </h1>

    </div>
    </header>

    <router-view />
    <main class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
      </div>
    </main>

    <footer class="mt-20 pb-10 text-center text-slate-400 text-sm">
      <div class="flex justify-center gap-4 mb-2">
        <div class="w-2 h-2 bg-red-400 rounded-full"></div>
        <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
      </div>
      Built by JohannesL2
      <p class="text-xs opacity-75">Frontend Developer | Vue 3 & TypeScript</p>
      <p class="mt-2 text-[10px] uppercase tracking-widest font-bold text-slate-300">
      Stockholm, Sweden 2026
      </p>
      <a href="https://github.com/JohannesL2/vue-pokedex" 
   target="_blank" 
   class="mt-4 inline-block hover:text-red-500 transition-colors duration-300 font-medium border-b border-transparent hover:border-red-500">
   View on GitHub →
      </a>
    </footer>
  </div>
</template>
