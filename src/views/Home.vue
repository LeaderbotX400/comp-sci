<script setup lang="ts">
const main = document.querySelector("main");

// @ts-ignore
main.style.backgroundImage = "url('/src/assets/images/default.jpg')";
</script>

<template>
  <v-container align="center">
    <v-card>
      <v-card-title>
        <h2>Hello!</h2>
      </v-card-title>
      <v-card-subtitle>
        <h3>
          Welcome to my small corner of the internet. <br />
          Use the buttons below to navigate this site, you can also use the
          Navbar at the top of the screen
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
                  <v-btn color="blue-darken-2" class="mb-3">
                    Pokemon Simulator
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
