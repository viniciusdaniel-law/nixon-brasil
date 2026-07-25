import { defineConfig } from 'astro/config';

const repository = 'nixon-brasil';
const customDomain = process.env.CUSTOM_DOMAIN;

export default defineConfig({
  site: customDomain ? `https://${customDomain}` : 'https://viniciusdaniel-law.github.io',
  base: customDomain ? '/' : `/${repository}`,
  trailingSlash: 'always',
});
