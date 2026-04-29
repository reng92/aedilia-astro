import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isCloudflare = Boolean(process.env.CF_PAGES);

export default defineConfig({
  site: 'https://www.aediliacostruzioni.it',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    keystatic(),
  ],
  // Cloudflare adapter solo in build (CF_PAGES=1 è impostato automaticamente da Cloudflare Pages)
  ...(isCloudflare ? { adapter: cloudflare({ mode: 'advanced' }), output: 'hybrid' } : { output: 'hybrid' }),
});
