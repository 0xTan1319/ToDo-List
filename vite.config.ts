import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: { "process.env": env },
    server: {
      host: "127.0.0.1",
      port: 3000,
      proxy: {
        "/api/v1": {
          target: process.env.API_URL || "http://localhost:5000",
          changeOrigin: true,
          secure: process.env.NODE_ENV === "production",
        },
      },
    },
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@contexts": "/src/contexts",
        "@features": "/src/features",
        "@pages": "/src/pages",
        "@styles": "/src/styles",
        "@utils": "/src/utils",
      },
    },
  };
});
