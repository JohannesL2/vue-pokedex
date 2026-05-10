<script setup lang="ts">
import { onMounted } from 'vue';
import { usePokemons } from '@/composables/usePokemons';
import PokemonCard from './PokemonCard.vue';

const { pokemons, loading, loadPokemons } = usePokemons();

onMounted(() => loadPokemons(100000));
</script>

<template>
    <div v-if="loading">Loading...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PokemonCard
            v-for="p in pokemons"
            :key="p.id"
            :pokemon="p"
        />
    </div>
</template>