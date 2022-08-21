<template>
  <v-app>
    <v-app-bar color="black">
      <v-toolbar-title>Comp-Sci</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="!loggedIn"
          @click="$router.push('/login')"
          color="primary"
          dark
          text
        >
          Login
        </v-btn>
        <v-btn v-if="loggedIn" @click="logout" color="primary" dark text>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view />
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
