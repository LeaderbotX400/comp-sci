<template>
  <v-app>
    <v-app-bar color="grey-darken-3">
      <v-toolbar-title>Comp-Sci</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="$router.push({ name: 'Home' })">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn
          v-if="!loggedIn"
          @click="$router.push('/login')"
          color="white"
          dark
          text
        >
          Login
        </v-btn>
        <v-btn v-if="loggedIn" @click="logout" color="white" dark text>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "./firebase";

export default defineComponent({
  name: "App",

  data() {
    return {
      loggedIn: false,
      user: {},
    };
  },
  methods: {
    logout() {
      auth.signOut();
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.user = user;
      } else {
        this.loggedIn = false;
        this.user = {};
      }
    });
  },
});
</script>

<style>
main {
  background-color: lightblue;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
