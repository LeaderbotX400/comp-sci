<script>
import Navbar from "./components/navbar.vue";
export default {
  components: { Navbar },
};
</script>
<template>
  <Navbar />
  <router-view> </router-view>
</template>
