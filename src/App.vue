<script>
import Navbar from "./components/navbar.vue";
export default {
  components: { Navbar },
};
</script>
<template>
  <Navbar />
  <div id="firebaseui-auth-container"></div>
  <router-view />
</template>
