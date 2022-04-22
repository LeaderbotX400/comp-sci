<template>
  <h3>Create an account!</h3>

  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { auth } from "../firebase";
import { EmailAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import "firebaseui";

export default {
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(auth);
    }
    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
        },
        // {
        //   provider: GoogleAuthProvider.PROVIDER_ID,
        // },
      ],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>
