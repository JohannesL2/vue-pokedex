<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { pokemonService } from '@/services/pokemonService';

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

const route = useRoute();
const router = useRouter();

const pokemon = ref<PokemonData | null>(null);
const loading = ref(true);

const fetchPokemon = async (identifier: string) => {
  loading.value = true;
  try {
    pokemon.value = await pokemonService.getPokemonDetails(identifier);
  } catch (error) {
    console.error("Kunde inte hämta Pokémon:", error);
  } finally {
    loading.value = false;
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!pokemon.value) return; // Validación de seguridad para TypeScript
  if (e.key === 'Escape') router.push('/');
  if (e.key === 'ArrowLeft' && pokemon.value.id > 1) {
    router.push({ name: 'pokemon-detail', params: { name: pokemon.value.id - 1 } });
  }
  if (e.key === 'ArrowRight') {
    router.push({ name: 'pokemon-detail', params: { name: pokemon.value.id + 1 } });
  }
};

watch(() => route.params.name, (newName) => {
  if (newName) fetchPokemon(newName as string);
});

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  fetchPokemon(route.params.name as string); 
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <div v-if="pokemon" class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
    <router-link to="/" class="text-red-500 font-bold mb-4 inline-block">← Back to list</router-link>
    
    <div class="flex gap-2">
        <button
          @click="router.push({ name: 'pokemon-detail', params: { name: pokemon.id - 1 } })"
          :disabled="pokemon.id <= 1"
          class="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed font-bold cursor-pointer"
        >
          Previous
        </button>
        <button
          @click="router.push({ name: 'pokemon-detail', params: { name: pokemon.id + 1 } })"
          class="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 font-bold cursor-pointer"
        >
          Next
        </button>
    </div>

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