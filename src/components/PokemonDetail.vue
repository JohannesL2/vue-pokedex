<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { pokemonService } from '@/services/pokemonService';

const route = useRoute();
const pokemon = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
    try {
        const name = route.params.name as string;
        pokemon.value = await pokemonService.getPokemonDetails(name);
    } catch (error) {
        console.error("Kunde inte hämta Pokémon:", error);
    } finally {
        loading.value = false;
    }
})
</script>

<template>
    <div v-if="pokemon" class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
    <router-link to="/" class="text-red-500 font-bold mb-4 inline-block">← Back to list</router-link>
    
    <div class="flex flex-col items-center">
      <img :src="pokemon.sprites.other['official-artwork'].front_default" class="w-64 h-64" />
      <h1 class="text-4xl font-black uppercase mt-4">{{ pokemon.name }}</h1>
      
      <div class="grid grid-cols-2 gap-4 mt-8 w-full text-center">
        <div class="bg-slate-100 p-4 rounded-lg">
          <p class="text-slate-500 text-xs uppercase">Height</p>
          <p class="font-bold">{{ pokemon.height / 10 }} m</p>
        </div>
        <div class="bg-slate-100 p-4 rounded-lg">
          <p class="text-slate-500 text-xs uppercase">Weight</p>
          <p class="font-bold">{{ pokemon.weight / 10 }} kg</p>
        </div>
      </div>
    </div>
  </div>
</template>