import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['code-arena_shield.webp', 'code-arena_logo.webp'],
      manifest: {
        name: "CodeArena | AI-Proctored Competitive Programming",
        short_name: "CodeArena",
        description: "Host secure coding contests and online assessments with AI proctoring, live leaderboards, and custom challenges.",
        start_url: "/",
        display: "standalone",
        background_color: "#121212",
        theme_color: "#f66b15",
        icons: [
          {
            src: "/code-arena_shield.webp",
            sizes: "192x192",
            type: "image/webp",
            purpose: "any maskable"
          },
          {
            src: "/code-arena_shield.webp",
            sizes: "512x512",
            type: "image/webp",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            // Cache API requests (Must start with ^http to match cross-origin requests in Workbox)
            urlPattern: /^https?:\/\/.*\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              networkTimeoutSeconds: 10, // Wait 10 seconds before falling back to cache
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    visualizer({
      open: true,
      gzipSize: true
    })
  ],
  build: {
    target: 'esnext'
  }
})
