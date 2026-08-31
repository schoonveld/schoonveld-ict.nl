// @ts-check
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare(),
	output: 'server',
	integrations: [react()],
	i18n: {
		defaultLocale: 'nl',
		locales: ['nl', 'en'],
		routing: { prefixDefaultLocale: false },
	},
	vite: {
		plugins: [tailwindcss()],
		environments: {
			client: {
			  optimizeDeps: {
				include: [
					// React island
					'react',
					'react/jsx-runtime',
					'react/jsx-dev-runtime',
					'react-dom',
					'react-dom/client',
					'@astrojs/react/client.js',
					// Astro client features used in this project
					'astro/runtime/client/dev-toolbar/entrypoint.js',
					'astro/actions/runtime/entrypoints/client.js',
					'astro/virtual-modules/transitions-router.js',
					'astro/virtual-modules/transitions-events.js',
					'astro/virtual-modules/transitions-swap-functions.js',
					'astro/virtual-modules/transitions-types.js',
				  ],
				  ignoreOutdatedRequests: true,
			  },
			},
		  },
	},
});
