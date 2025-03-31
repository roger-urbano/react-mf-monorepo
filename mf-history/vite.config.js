import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfHistory',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteView': './src/components/RemoteView.jsx'
      },
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'axios']
    })
  ],
  server: {
    port: 3002
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});