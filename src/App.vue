<template>
  <Navbar v-if="!mobile" />
  <NavbarMobile v-else />
  <div id="firebaseui-auth-container"></div>
  <router-view :key="$route.fullPath" />
</template>

<script>
import Navbar from "./components/navbar.vue";
import NavbarMobile from "./components/navbar-mobile.vue";
export default {
  components: { Navbar, NavbarMobile },
  data() {
    return {
      mobile: false,
      width: null,
    };
  },
  methods: {
    checkIfMobile() {
      if (this.width < 600) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
    getScreenWidth() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    },
    handleResize() {
      this.width = this.getScreenWidth();
      this.checkIfMobile();
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
