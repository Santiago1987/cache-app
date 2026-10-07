import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "node:child_process";

const commitHash = (() => {
  if (process.env.COMMIT_HASH) return process.env.COMMIT_HASH.slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "dev";
  }
})();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      __COMMIT_HASH__: JSON.stringify(commitHash),
    },
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
          secure: false
        },
      },
    },
  };
});
