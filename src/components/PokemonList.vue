<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '@/stores/pokemonStore';
import PokemonCard from './PokemonCard.vue';

const pokemonStore = usePokemonStore();

onMounted(() => {
    if (pokemonStore.pokemons.length === 0) {
        pokemonStore.loadMore();
    }
});
</script>

<template>
    <div v-if="pokemonStore.pokemons.length > 0" 
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 p-4">
        <PokemonCard
            v-for="p in pokemonStore.pokemons"
            :key="p.id"
            :pokemon="p"
            class="transform transition-all duration-300 hover:-translate-y-1 hover:bg-black rounded-2xl"
        />

        <template v-if="pokemonStore.loading && pokemonStore.pokemons.length > 0">
            <div v-for="i in 8" :key="'skeleton-' + i"
                class="h-64 bg-slate-200 animate-pulse rounded-2xl border-2 border-slate-100">
            </div>
        </template>
    </div>

    <div class="mt-10 flex flex-col items-center min-h-[100px] justify-center">
    
    <div v-if="pokemonStore.loading" class="flex flex-col items-center gap-2">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <p>Catching more...</p>
    </div>

    <button
      v-else
      @click="pokemonStore.loadMore"
      class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
    >
      Load More
    </button>

    </div>
</template>