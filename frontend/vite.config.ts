/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  test: {
    globals: true,                // allows global test(), expect(), describe()
    environment: 'jsdom',         // simulates a browser environment
    setupFiles: './vite.setupTest.ts', // setup RTL matchers
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})