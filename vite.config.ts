import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@config': path.resolve(__dirname, './src/app/config'),
      '@components': path.resolve(__dirname, './src/app/components'),
      '@reducers': path.resolve(__dirname, './src/app/reducers'),
      '@shared': path.resolve(__dirname, './src/app/shared'),
      '@app': path.resolve(__dirname, './src/app'),
    },
  },
})
