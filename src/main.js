//Vue stuff
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "firebaseui/dist/firebaseui.css";
import navbar from "./components/navbar.vue";

createApp(App).use(router).component("Navbar", navbar).mount("#app");
