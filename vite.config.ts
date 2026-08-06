import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const lazyVendorChunks = ['three-vendor', 'motion-vendor']

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: {
      resolveDependencies(_filename, deps, { hostType }) {
        if (hostType === 'html') {
          return deps.filter(
            (dep) =>
              !lazyVendorChunks.some((chunk) => dep.includes(chunk)),
          )
        }
        return deps
      },
    },
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three-vendor',
              test: /node_modules[\\/](three|@react-three|maath)[\\/]/,
            },
            {
              name: 'motion-vendor',
              test: /node_modules[\\/]framer-motion[\\/]/,
            },
          ],
        },
      },
    },
  },
})
