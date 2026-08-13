import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'My React Todo List',
        short_name: 'React Todo',
        description: '오프라인 지원 및 모바일 설치가 가능한 리액트 할 일 관리 앱',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/my-react-todo/',
        start_url: '/my-react-todo/',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/906/906334.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/906/906334.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
  base: '/my-react-todo/'
});