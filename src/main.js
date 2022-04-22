//Vue stuff
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "firebaseui/dist/firebaseui.css";
import navbar from "./components/navbar.vue";

createApp(App).use(router).use(store).component("Navbar", navbar).mount("#app");
