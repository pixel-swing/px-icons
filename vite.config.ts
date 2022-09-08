import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const root = path.resolve(__dirname);
const p = process.argv[2] // node this.js compName
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages/icons/fa/vue/AccessibleIcon.vue'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
