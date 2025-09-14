import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [],
  server: {
    proxy: {
      '/csv': {
        target: 'https://earthquake.usgs.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/csv/, ''),
      },
    },
  },
});
