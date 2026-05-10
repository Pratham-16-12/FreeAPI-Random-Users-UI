import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this line. IMPORTANT: It must match your exact GitHub repository name!
  base: '/FreeAPI-Random-Users-UI/',
})