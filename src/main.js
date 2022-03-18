// load fontawesome
let faJS = document.createElement("script");
faJS.src = "https://pro.fontawesome.com/releases/v5.11.1/js/all.js";
faJS.crossOrigin = "anonymous";
document.head.appendChild(faJS);

let faCSS = document.createElement("link");
faCSS.rel = "stylesheet";
faCSS.href = "https://pro.fontawesome.com/releases/v5.11.1/css/all.css";
faCSS.crossOrigin = "anonymous";
document.head.appendChild(faCSS);

import { createApp } from "vue";
import App from "./App.vue";
import navbar from "components/navbar.vue";

createApp(navbar).mount("#navbar");
createApp(App).mount("#app");
