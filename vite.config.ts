import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) =>
{
  const env = loadEnv(mode, process.cwd());
  return {
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  plugins: [
      react(),
  ],
  server: {
    port: 3002,
    host: "0.0.0.0",
    strictPort: true,
  }
}})
