import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative assets make the same build work on a custom domain or a
  // repository subpath on GitHub Pages without editing this file.
  base: './',
  plugins: [react(), tailwindcss()],
});
