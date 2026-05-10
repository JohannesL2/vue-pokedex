<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const allPokemonNames = ref<string[]>([]);

onMounted(async () => {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
        const data = await res.json();
        allPokemonNames.value = data.results.map((p: any) => p.name);
    } catch (err) {
        console.error('Could not get search suggestions', err);
    }
})

const handleSearch = () => {
    const q = searchQuery.value.trim().toLowerCase();

    if (q) {
        router.push({ name: 'pokemon-detail', params: { name: q } });
        searchQuery.value = '';
    }
};
</script>

<template>
    <div class="relative max-w-md mx-auto mb-8">
        <form @submit.prevent="handleSearch" class="relative group">
            <input
                v-model="searchQuery"
                list="pokemon-suggestions"
                type="text"
                placeholder="Search by name or ID"
                class="w-full px-12 py-4 bg-white border-2 border-slate-200 rounded-full shadow-sm text-black"
            />

            <datalist id="pokemon-suggestions">
                <option v-for="name in allPokemonNames" :key="name" :value="name" />
            </datalist>

            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <button
                type="submit"
                class="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-600 active:scale-95 transition-all shadow-md"
            >
              Search
            </button>
        </form>
    </div>
</template>