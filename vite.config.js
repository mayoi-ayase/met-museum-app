import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // I'm not 100% sure what this does, but it's required
    environment: 'jsdom', // environment for running tests to simulate the browser
    setupFiles: './src/test/setup.js', // this is where we tell vite to import jest-dom
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
})
