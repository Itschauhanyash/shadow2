import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// We'll comment out the lovable-tagger import since it's causing TypeScript errors
// and likely not necessary for GitHub Pages deployment
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
  base: "/shadow2/", // Add this line for GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Comment out the componentTagger since it's causing type issues
    // mode === 'development' &&
    // componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
