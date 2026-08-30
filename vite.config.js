import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

// No options are passed to sveltekit() here so that svelte.config.js
// (which sets up mdsvex for .md posts and the static adapter) is used.
export default defineConfig({
  plugins: [sveltekit()],
});
