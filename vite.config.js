import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // O chunk da bolha 3D (three + R3F + drei) passa de 500 kB, mas é carregado sob demanda.
    chunkSizeWarningLimit: 1000,
  },
})
