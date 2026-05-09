import { describe, it, expect, vi } from 'vitest';
import { pokemonService } from './pokemonAPI';

global.fetch = vi.fn();

describe('pokemonService', () => {
    it('fetch and return a list of pokemons', async () => {
        const mockList = {
            results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
        };
        const mockDetail = { name: 'bulbasaur', id: 1, sprites: {}, types: [] };

        (fetch as any)
        .mockResolvedValueOnce({ json: async () => mockList })
        .mockResolvedValueOnce({ json: async () => mockDetail });

        const result = await pokemonService.getPokemons(1);

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('bulbasaur');
        expect(result[0].id).toBe(1);
    });
});