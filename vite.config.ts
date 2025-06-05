import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TAILWIND PLUGIN
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  
})
