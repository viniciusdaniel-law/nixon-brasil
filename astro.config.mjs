import { defineConfig } from 'astro/config';

const repository = 'nixon-brasil';
const customDomain = process.env.CUSTOM_DOMAIN;

export default defineConfig({
  site: customDomain ? `https://${customDomain}` : 'https://viniciusdaniel-law.github.io',
  base: customDomain ? '/' : `/${repository}`,
  trailingSlash: 'always',
  output: 'static',

  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },

  vite: {
    build: {
      reportCompressedSize: false,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },
  },
});
