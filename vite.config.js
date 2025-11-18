import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'copy-admin-files',
      writeBundle() {
        // Copy admin files to dist folder
        try {
          mkdirSync('dist/admin', { recursive: true })
          copyFileSync('admin.html', 'dist/admin/index.html')
          copyFileSync('admin/config.yml', 'dist/admin/config.yml')
          // Try to copy _headers if it exists
          try {
            copyFileSync('admin/_headers', 'dist/admin/_headers')
          } catch (e) {
            // _headers file doesn't exist, that's ok
          }
        } catch (error) {
          console.warn('Could not copy admin files:', error.message)
        }
      }
    }
  ],
  base: '/indigoroom/'
})
