import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfShell',
      remotes: {
        mfDetail: 'http://localhost:3001/assets/remoteEntry.js',
        mfHistory: 'http://localhost:3002/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'axios', 'react-toastify', 'react-spinners']
    })
  ],
  server: {
    port: 3000
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: true
  }
});
