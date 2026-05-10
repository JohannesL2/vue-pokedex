import { createRouter, createWebHistory } from "vue-router";
import PokemonList from "@/components/PokemonList.vue";
import PokemonDetail from "@/components/PokemonDetail.vue";

const router = createRouter({
    history: createWebHistory('/vue-pokedex/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: PokemonList
        },
        {
            path: '/pokemon/:name',
            name: 'pokemon-detail',
            component: PokemonDetail,
            props: true
        }
    ]
})

export default router