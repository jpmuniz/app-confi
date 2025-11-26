import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'react/compiler-runtime': 'react/jsx-runtime',
    },
  },
  plugins: [react()],
})
