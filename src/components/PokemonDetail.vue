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

const typeColorMap: Record<string, string> = {
  normal: 'bg-gray-400 text-white',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-green-500 text-white',
  electric: 'bg-yellow-400 text-black',
  ice: 'bg-cyan-300 text-black',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-amber-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-white',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-violet-700 text-white',
  dragon: 'bg-indigo-700 text-white',
  dark: 'bg-stone-800 text-white',
  steel: 'bg-slate-400 text-white',
  fairy: 'bg-pink-300 text-black',
};

const getTypeColor = (typeName: string): string => {
  return typeColorMap[typeName.toLowerCase()] || 'bg-slate-500 text-white';
};
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
      <div class="flex flex-wrap gap-2 mt-3 justify-center">
        <span
            v-for="t in pokemon.types"
            :key="t.type.name"
            :class="getTypeColor(t.type.name)"
            class="px-4 py-1 text-xs font-bold uppercase rounded-full tracking-wider shadow-sm"
        >
            {{ t.type.name }}
        </span>
      </div>
      
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