/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use '/' for custom domains (Hostinger, Vercel) and local dev
  base: process.env.GH_PAGES ? '/Thalir-Dental-Clinic/' : '/',
})
