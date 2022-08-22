<script setup lang="ts">
import { useFavicon, useTitle } from "@vueuse/core";
const main = document.querySelector("main");

useTitle("Computer Science - RNG Dragon");
useFavicon("https://icon-library.com/images/icon-dragon/icon-dragon-27.jpg");
// @ts-ignore
main.style.backgroundImage =
  "url('https://wallpapercave.com/wp/wp7510952.jpg')";
</script>

<template>
  <v-container align="center">
    <v-btn color="blue-darken-2" size="large" v-if="!game" @click="run()">
      <v-icon>mdi-controller</v-icon> {{ text.btn }}
    </v-btn>
    <v-card v-if="game">
      <v-container>
        <v-row>
          <v-col>
            {{ text.game }}
          </v-col>
        </v-row>
        <v-row v-if="!options.hidden">
          <v-col>
            <v-btn color="blue-darken-2" size="large" @click="checkCave(0)">
              <v-icon>mdi-arrow-left</v-icon> Left
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="blue-darken-2" size="large" @click="checkCave(1)">
              <v-icon>mdi-arrow-right</v-icon> Right
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="gameOver">
          <v-col>
            <v-btn color="blue-darken-2" size="large" @click="reset()">
              <v-icon>mdi-restart</v-icon> Restart
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Dragon",
  data() {
    return {
      game: false,
      text: {
        btn: "Start",
        game: "You are in a land full of dragons. In front of you, you see two caves. In one cave, the dragon is friendly and will share his treasure with you. The other dragon is greedy and hungry, and will eat you on sight.",
      },
      options: {
        hidden: true,
        btn1: "",
        btn2: "",
      },
      gameOver: false,
    };
  },
  methods: {
    run() {
      this.game = true;
      setTimeout(() => {
        this.text.game = "Which cave will you go into?";
        this.options = {
          hidden: false,
          btn1: "Left",
          btn2: "Right",
        };
      }, 5000);
    },
    checkCave(input: number) {
      this.options = {
        hidden: true,
        btn1: "",
        btn2: "",
      };
      const rng = Math.floor(Math.random() * 2);
      console.log(input, rng);
      this.text.game = `You approach the cave…
        \nIt is dark and spooky…
        \nA large dragon jumps out in front of you! He opens his jaws and...`;

      setTimeout(() => {
        if (input == rng) {
          this.text.game = `${this.text.game} \nGives you a treasure`;
        } else {
          this.text.game = `${this.text.game} \nGobbles you down in one bite!`;
        }
        this.gameOver = true;
      }, 2000);
    },
    reset() {
      this.gameOver = false;
      this.text = {
        btn: "Start",
        game: "You are in a land full of dragons. In front of you, you see two caves. In one cave, the dragon is friendly and will share his treasure with you. The other dragon is greedy and hungry, and will eat you on sight.",
      };
      this.options = {
        hidden: true,
        btn1: "",
        btn2: "",
      };
      this.run();
    },
  },
});
</script>
