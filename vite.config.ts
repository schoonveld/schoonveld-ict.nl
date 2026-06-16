export default defineConfig({
    optimizeDeps: {
      exclude: ['astro', 'audit', 'xray', 'toolbar'] // Replace with the actual package causing the issue
    }
  })