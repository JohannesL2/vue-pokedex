import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { usePokemons } from "@/composables/usePokemons";
import type { Pokemon } from "@/types/Pokemon";

interface PokemonListItem {
    name: string;
    id: number;
}

export const usePokemonStore = defineStore('pokemon', () => {
    const { fetchPokemons, loading, error } = usePokemons();

    const pokemons = ref<Pokemon[]>([]);
    const offset = ref(0);
    const limit = 20;

    const allPokemonList = ref<PokemonListItem[]>([]);
    const searchQuery = ref('');

    async function loadMore() {
        if (loading.value) return;

        const newData = await fetchPokemons(limit, offset.value);

        if (newData.length > 0) {
            pokemons.value = [...pokemons.value, ...newData];
            offset.value += limit;
        }
    }

    async function loadAllPokemonNames() {
        if (allPokemonList.value.length > 0) return;

        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
            const data = await res.json();
            allPokemonList.value = data.results.map((p: { name: string; url: string }) => ({
                name: p.name,
                id: Number(p.url.split('/').filter(Boolean).pop()),
            }));
        } catch (err) {
            console.error('Could not load full Pokémon list', err);
        }
    }

    const filteredPokemons = computed<Pokemon[]>(() => {
        const q = searchQuery.value.trim().toLowerCase();

        if (!q) return pokemons.value;

        return allPokemonList.value
            .filter(p => p.name.toLowerCase().includes(q))
            .map(p => ({
                id: p.id,
                name: p.name,
                sprites: {
                    front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
                },
                types: [],
            }));
    });

    return { pokemons, loading, error, loadMore, allPokemonList, searchQuery, loadAllPokemonNames, filteredPokemons };
});
