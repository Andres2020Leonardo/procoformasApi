import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@primary': '#011034',
          '@secundary': '#ffffff',
          '@primary-red': '#e30613',
          '@primary-blue': '#498ac2',
          '@primary-green': '#3da350',
          '@neutral-white': '#ffffff',
          '@neutral-black': '#333333',
          '@light-gray': '#f0f0f0',
          '@dark-gray': '#666666',
        },
        javascriptEnabled: true,
      },
    },
  },
})
