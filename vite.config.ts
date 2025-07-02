import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV !== 'local' ? '/kidsgames/' : '/',
  plugins: [
    react({ tsDecorators: true }),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // this will auto update immediately when changes are found
      workbox: {
        // workbox options for generateSW
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    }),
  ],
})
