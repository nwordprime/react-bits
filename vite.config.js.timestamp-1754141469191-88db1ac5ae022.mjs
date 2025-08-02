// vite.config.js
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///home/project/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
import safeParser from "file:///home/project/node_modules/postcss-safe-parser/lib/safe-parse.js";
import { fileURLToPath } from "url";
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.js";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: true
  },
  resolve: {
    alias: {
      "@": "/src",
      "@utils": path.resolve(__dirname, "src/utils"),
      "@content": path.resolve(__dirname, "src/content"),
      "@tailwind": path.resolve(__dirname, "src/tailwind"),
      "@ts-default": path.resolve(__dirname, "src/ts-default"),
      "@ts-tailwind": path.resolve(__dirname, "src/ts-tailwind")
    }
  },
  css: {
    postcss: {
      parser: safeParser
    }
  },
  assetsInclude: ["**/*.glb"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNhZmVQYXJzZXIgZnJvbSAncG9zdGNzcy1zYWZlLXBhcnNlcidcblxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIHRhaWx3aW5kY3NzKCldLFxuICBzZXJ2ZXI6IHtcbiAgICBobXI6IHRydWVcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6ICcvc3JjJyxcbiAgICAgICdAdXRpbHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzJyksXG4gICAgICAnQGNvbnRlbnQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbnRlbnQnKSxcbiAgICAgICdAdGFpbHdpbmQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3RhaWx3aW5kJyksXG4gICAgICAnQHRzLWRlZmF1bHQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3RzLWRlZmF1bHQnKSxcbiAgICAgICdAdHMtdGFpbHdpbmQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3RzLXRhaWx3aW5kJyksXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGFyc2VyOiBzYWZlUGFyc2VyXG4gICAgfVxuICB9LFxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyouZ2xiJ11cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLE9BQU8sV0FBVztBQUMzTyxPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFFdkIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBb0I7QUFOcUcsSUFBTSwyQ0FBMkM7QUFRbkwsSUFBTSxZQUFZLEtBQUssUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFFN0QsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7QUFBQSxFQUNoQyxRQUFRO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFDUDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsVUFBVSxLQUFLLFFBQVEsV0FBVyxXQUFXO0FBQUEsTUFDN0MsWUFBWSxLQUFLLFFBQVEsV0FBVyxhQUFhO0FBQUEsTUFDakQsYUFBYSxLQUFLLFFBQVEsV0FBVyxjQUFjO0FBQUEsTUFDbkQsZUFBZSxLQUFLLFFBQVEsV0FBVyxnQkFBZ0I7QUFBQSxNQUN2RCxnQkFBZ0IsS0FBSyxRQUFRLFdBQVcsaUJBQWlCO0FBQUEsSUFDM0Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWUsQ0FBQyxVQUFVO0FBQzVCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
