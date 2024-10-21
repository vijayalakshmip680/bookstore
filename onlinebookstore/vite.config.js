import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    globals:true,
    environment: 'jsdom', // Use jsdom for DOM-related tests
    setupFiles: './src/setupTests.js', // Optional: create setup for additional configurations
  }
})
