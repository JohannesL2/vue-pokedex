import { ref } from 'vue';
import { pokemonService } from '@/services/pokemonService';
import type { Pokemon } from '@/types/Pokemon';

export function usePokemons() {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchPokemons = async (limit: number = 20, offset: number = 0): Promise<Pokemon[]> => {
        loading.value = true;
        error.value = null;
        try {
            return await pokemonService.getPokemons(limit, offset);
        } catch (e) {
            error.value = 'Could not load Pokémon...';
            console.error(e);
            return [];
        } finally {
            loading.value = false;
        }
    };

    return { loading, error, fetchPokemons };
}