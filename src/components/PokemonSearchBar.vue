<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';

const pokemonStore = usePokemonStore();

const handleSearch = () => {
    const q = pokemonStore.searchQuery.trim().toLowerCase();

    if (q) {
        pokemonStore.searchQuery = '';
    }
};
</script>

<template>
    <div class="relative w-full max-w-md md:mx-0">
        <form @submit.prevent="handleSearch" class="relative group">
            <input
                v-model="pokemonStore.searchQuery"
                list="pokemon-suggestions"
                type="text"
                placeholder="Search by name or ID"
                class="w-full pl-10 pr-20 md:pr-24 py-3 md:py-4 bg-white border-2 border-slate-200 rounded-full shadow-sm text-black text-sm md:text-base focus:border-red-500 outline-none transition-all"
            />

            <datalist id="pokemon-suggestions">
                <option v-for="p in pokemonStore.allPokemonList" :key="p.name" :value="p.name" />
            </datalist>

            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <button
                type="submit"
                class="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-600 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Search
            </button>
        </form>
    </div>
</template>