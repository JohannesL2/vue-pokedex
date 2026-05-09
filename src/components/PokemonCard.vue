<script setup lang="ts">
import type { Pokemon } from '@/types/Pokemon';

defineProps<{
  pokemon: Pokemon;
}>();
</script>

<template>
    <div class="card border p-4 rounded shadow hover:shadow-md">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        <h3 class="capitalize">{{ pokemon.name }}</h3>
        <p>ID: #{{ pokemon.id }}</p>
    </div>
</template>