<script setup lang="ts">
const main = document.querySelector("main");

// @ts-ignore
main.style.backgroundImage = "";
</script>

<template>
  <v-app-bar color="black">
    <v-toolbar-title> Kanto Pokemon </v-toolbar-title>
  </v-app-bar>
  <v-container align="center">
    <v-spacer />
    <v-row v-if="!rendering">
      <v-col>
        <v-btn color="red" @click="fetchKantoPokemon()">
          Generate pokemon
        </v-btn>
      </v-col>
    </v-row>
    <v-progress-linear
      v-if="rendering && pokemon.length < 151"
      indeterminate
      color="red"
    />
    <v-pagination
      v-if="pokemon.length >= 151"
      v-model="page"
      :length="Math.ceil(pokemon.length / perPage)"
      :total-visible="5"
      class="mt-3"
    />
    <v-row>
      <v-col v-for="(data, index) in visiblePokemon" :key="index">
        <Pokemon :data="data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  data() {
    return {
      page: 1,
      perPage: 4,
      rendering: false,
      pokemon: [] as any[],
    };
  },
  components: {
    Pokemon: defineAsyncComponent(() => import("@/components/pokemon.vue")),
  },
  computed: {
    visiblePokemon() {
      return this.pokemon.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  methods: {
    fetchKantoPokemon() {
      this.rendering = true;
      fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((data) => {
          this.fetchPokemonData(data.results);
        });
    },
    fetchPokemonData(pokemon: any) {
      pokemon.forEach((pokemon: any) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((data: any) => {
            this.pokemon.push(data);
          });
      });
    },
  },
});
</script>
