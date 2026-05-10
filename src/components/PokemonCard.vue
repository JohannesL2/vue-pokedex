<script setup lang="ts">
import type { Pokemon } from '@/types/Pokemon';

defineProps<{
  pokemon: Pokemon;
}>();
</script>

<template>
    <router-link :to="{ name: 'pokemon-detail', params: { name: pokemon.name } }" class="block">
    <div class="group border p-4 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
      <div class="relative flex justify-center bg-slate-50 rounded-lg p-4 mb-4 overflow-hidden">
        <div class="absolute inset-0 bg-slate-200/50 rounded-full scale-75 group-hover:scale-90 transition-transform duration-500"></div>
        
        <img 
          :src="pokemon.sprites.front_default" 
          :alt="pokemon.name" 
          class="relative w-32 h-32 z-10"
        />
      </div>
      
      <div class="text-center">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
        <h3 class="text-xl font-black capitalize text-slate-700 mt-1">{{ pokemon.name }}</h3>
        
        <div class="flex justify-center gap-2 mt-3">
          <span v-for="t in pokemon.types" :key="t.type.name" 
            class="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-500">
            {{ t.type.name }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>