import type { Pokemon } from "@/types/Pokemon";

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
    async getPokemons(limit = 100000): Promise<Pokemon[]> {
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
        const data = await response.json();

        const detailPromises = data.results.map(async (p: { url: string }) => {
            const res = await fetch(p.url);
            return await res.json();
        });

        return Promise.all(detailPromises);
    },

    async getPokemonDetails(identifier: string | number): Promise<Pokemon> {
        const response = await fetch(`${BASE_URL}/pokemon/${identifier}`);
        if (!response.ok) throw new Error('Pokemon not found');
        return await response.json();
    }
};