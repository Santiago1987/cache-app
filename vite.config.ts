import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_TEST_SERVER_URL,
          changeOrigin: true,
        },
        "/login": {
          target: env.VITE_TEST_SERVER_URL,
          changeOrigin: true,
        },
        "/logout": {
          target: env.VITE_TEST_SERVER_URL,
          changeOrigin: true,
        },
        "/me": {
          target: env.VITE_TEST_SERVER_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
