<script setup lang="ts">
import { useFavicon, useTitle } from "@vueuse/core";

useTitle("Computer Science - Login");
useFavicon(
  "https://cdn.iconscout.com/icon/premium/png-256-thumb/computer-science-1847495-1567216.png"
);

const main = document.querySelector("main");

// @ts-ignore
main.style.backgroundImage =
  "url('https://wallpapercave.com/wp/wp2044697.jpg')";
</script>

<template>
  <v-container class="d-flex justify-center align-center">
    <v-card color="dark-grey" width="300">
      <v-card-title class="text-center">
        <h1>Login</h1>
      </v-card-title>
      <div id="firebaseui-auth-container"></div>
      <v-container id="loader" align="center">
        loading...
        <v-progress-circular indeterminate />
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "../firebase";
import { GoogleAuthProvider } from "@firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
export default defineComponent({
  name: "login",
  data() {
    return {
      loggedIn: false,
      user: {},
    };
  },
  methods: {
    showAuthMenu() {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(auth);
      }
      const uiConfig = {
        callbacks: {
          uiShown: function () {
            document.getElementById("loader")!.style.display = "none";
          },
        },
        signinFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [
          {
            provider: GoogleAuthProvider.PROVIDER_ID,
            clientID:
              "298035394065-im4881834l5nk4eki5ahv1gg2fspntrp.apps.googleusercontent.com",
          },
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.showAuthMenu();
      }
    });
  },
});
</script>
