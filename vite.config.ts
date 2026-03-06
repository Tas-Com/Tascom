import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["@tanstack/react-router"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-map": ["maplibre-gl", "@vis.gl/react-maplibre"],
          "vendor-ui": [
            "lucide-react",
            "sonner",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
          "vendor-form": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-i18n": ["i18next", "react-i18next"],
        },
      },
    },
  },
});
