import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.VITE_BASE || `/${process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'Mega-Starship'}/`

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 5173 }
})
