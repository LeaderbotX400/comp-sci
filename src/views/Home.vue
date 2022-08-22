<script setup lang="ts">
import { useFavicon, useTitle } from "@vueuse/core";
const main = document.querySelector("main");

useTitle("Computer Science");
useFavicon(
  "https://cdn.iconscout.com/icon/premium/png-256-thumb/computer-science-1847495-1567216.png"
);

// @ts-ignore
main.style.backgroundImage =
  "url('https://wallpapercave.com/wp/wp2044697.jpg')";
</script>

<template>
  <v-container align="center">
    <v-card max-width="800">
      <v-card-title>
        <h2>Hello!</h2>
      </v-card-title>
      <v-card-subtitle>
        <h3>
          Welcome to my small corner of the internet. <br />
          Use the buttons below to navigate this site
        </h3>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col>
            <v-container>
              <v-row>
                <v-col>
                  <h2>Games</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex flex-column">
                  <v-btn
                    color="blue-darken-2"
                    class="mb-3"
                    @click="$router.push({ name: 'Dragon' })"
                  >
                    RNG Dragon
                  </v-btn>
                  <v-btn color="blue-darken-2" class="mb-3" disabled>
                    Pokemon Simulator (coming
                    soon<v-icon>mdi-trademark</v-icon>)
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col>
            <v-container>
              <v-row>
                <v-col>
                  <h2>API powered applications</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex flex-column">
                  <v-btn
                    color="blue-darken-2"
                    class="mb-3"
                    @click="$router.push({ name: 'Pokedex' })"
                  >
                    Pokedex
                  </v-btn>
                  <v-btn
                    color="blue-darken-2"
                    class="mb-3"
                    @click="$router.push({ name: 'Weather' })"
                  >
                    Weather
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>
