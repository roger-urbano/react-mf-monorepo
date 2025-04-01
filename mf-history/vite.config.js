import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfHistory',
      filename: 'remoteEntry.js',
      exposes: {
        './PokemonsViewed': './src/components/PokemonsViewed.jsx'
      },
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'axios'],
      dev: true, // <-- esto es clave para que funcione con npm run dev   
      remotes: {},  
    })
  ],
  server: {
    port: 4175
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});