import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

import mkcert from "vite-plugin-mkcert";
import { terser } from "rollup-plugin-terser";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Referrer-Policy": "no-referrer",
    },
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    mkcert(),
    terser({
      compress: {
        drop_console: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        passes: 2,
      },
      format: {
        comments: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
