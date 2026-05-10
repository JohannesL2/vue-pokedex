import { ref } from 'vue';
import { pokemonService } from '@/services/pokemonService';
import type { Pokemon } from '@/types/Pokemon';

export function usePokemons() {
    const pokemons = ref<Pokemon[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const loadPokemons = async (limit: number = 20, offset: number = 0) => {
        loading.value = true;
        error.value = null;
        try {
            const refreshPokemons = await pokemonService.getPokemons(limit, offset);

            if (offset === 0) {
                pokemons.value = refreshPokemons;
            } else {
                pokemons.value = [...pokemons.value, ...refreshPokemons]
            }
        } catch (e) {
            error.value = 'Could not load Pokémon...';
            console.error(e);
        } finally {
            loading.value = false;
        }
    };

    return { pokemons, loading, error, loadPokemons };
}