import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Unified config: ensure Tailwind and React plugins are both active
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
