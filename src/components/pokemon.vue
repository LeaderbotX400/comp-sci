<template>
  <v-card width="400">
    <v-img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`"
    />
    <v-card-title>
      <h3>{{ data.name }}</h3>
    </v-card-title>
    <v-card-subtitle>
      <v-chip
        v-for="(type, index) in data.types"
        :key="index"
        :color="color(type.type.name)"
        text-color="white"
      >
        {{ type.type.name }}
      </v-chip>
      <v-table align="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Height</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ data.id }}</td>
            <td>{{ data.height }}</td>
            <td>{{ data.weight }}</td>
          </tr>
        </tbody></v-table
      >

      <h5>#{{ data.id }}</h5>
    </v-card-subtitle>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title> Stats </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-table>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stat, index) in data.stats" :key="index">
                  <td>{{ stat.stat.name }}</td>
                  <td>{{ stat.base_stat }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object as any,
      required: true,
    },
  },
  methods: {
    color(type: string) {
      switch (type) {
        case "normal":
          return "grey";
        case "fighting":
          return "red";
        case "flying":
          return "indigo";
        case "poison":
          return "purple";
        case "ground":
          return "orange";
        case "rock":
          return "brown";
        case "bug":
          return "green";
        case "ghost":
          return "grey";
        case "steel":
          return "blue";
        case "fire":
          return "red";
        case "water":
          return "blue";
        case "grass":
          return "green";
        case "electric":
          return "yellow";
        case "psychic":
          return "pink";
        case "ice":
          return "blue";
        case "dragon":
          return "indigo";
        case "dark":
          return "grey";
        case "fairy":
          return "pink";
        default:
          return "grey";
      }
    },
  },
  mounted() {},
});
</script>
