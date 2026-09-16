// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import resumePdf from './src/integrations/resume-pdf.mjs';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), resumePdf()],
	i18n: {
		defaultLocale: 'nl',
		locales: ['nl', 'en'],
		routing: { prefixDefaultLocale: false },
	},
	vite: {
		plugins: [tailwindcss()],
		// Proxy contact to localhost
		// server: {
		// 	proxy: {
		// 		'/api/contact': {
					// target: 'http://localhost:8787',
					// changeOrigin: true,
					// rewrite: (path) => path.replace(/^\/api\/contact/, ''),
		// 		},
		// 	},
		// },
	
	},
});
