import { defineStore } from "pinia";
import { ref } from "vue";
import { usePokemons } from "@/composables/usePokemons";
import type { Pokemon } from "@/types/Pokemon";

export const usePokemonStore = defineStore('pokemon', () => {
    const { fetchPokemons, loading, error } = usePokemons();

    const pokemons = ref<Pokemon[]>([]);
    const offset = ref(0);
    const limit = 20;

    async function loadMore() {
        if (loading.value) return;

        const newData = await fetchPokemons(limit, offset.value);

        if (newData.length > 0) {
            pokemons.value = [...pokemons.value, ...newData];
            offset.value += limit;
        }
    }

    return { pokemons, loading, error, loadMore };
});