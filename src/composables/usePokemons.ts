import { ref } from 'vue';
import { pokemonService } from '@/services/pokemonService';
import type { Pokemon } from '@/types/Pokemon';

export function usePokemons() {
    const pokemons = ref<Pokemon[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const loadPokemons = async (limit?: number) => {
        loading.value = true;
        error.value = null;
        try {
            pokemons.value = await pokemonService.getPokemons(limit);
        } catch (e) {
            error.value = 'Could not load Pokémon...';
        } finally {
            loading.value = false;
        }
    };

    return { pokemons, loading, error, loadPokemons };
}