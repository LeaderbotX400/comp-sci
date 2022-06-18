import { fileURLToPath, URL } from "url";
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    terser({
      compress: {
        drop_console: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        passes: 2,
      },
      format: {
        comments: false,
        ecma: '2020',
      },
    }),],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
