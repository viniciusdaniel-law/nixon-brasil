import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const requiredRoutes = [
  'dist/index.html',
  'dist/biografia/index.html',
  'dist/presidencia/index.html',
  'dist/politica-externa/index.html',
  'dist/brasil/index.html',
  'dist/acervo/index.html',
  'dist/artigos/index.html',
  'dist/videos/index.html',
  'dist/sobre/index.html',
  'dist/404.html',
];

for (const route of requiredRoutes) {
  await access(route, constants.R_OK);
}

const [home, recoveryCss, source] = await Promise.all([
  readFile('dist/index.html', 'utf8'),
  readFile('src/styles/home-recovery.css', 'utf8'),
  readFile('src/pages/index.astro', 'utf8'),
]);

const forbiddenCopy = ['Sem desculpas', 'Arquivo · ensaio · apologia', 'quote-band', 'class="ticker"'];
for (const fragment of forbiddenCopy) {
  if (home.includes(fragment) || source.includes(fragment)) {
    throw new Error(`Forbidden homepage fragment returned: ${fragment}`);
  }
}

const requiredSourceFragments = ['shell-wide', 'editorial-grid', 'compact-list', 'hero-note'];
for (const fragment of requiredSourceFragments) {
  if (!source.includes(fragment)) {
    throw new Error(`Homepage is missing required structure: ${fragment}`);
  }
}

if (!/\.hero-v2\s*\{[^}]*flex-direction:\s*column/s.test(recoveryCss)) {
  throw new Error('Hero regression: .hero-v2 must remain a vertical flex container.');
}

if (!home.includes('Publicação histórica') || !home.includes('Nixon Brasil')) {
  throw new Error('Generated homepage is missing institutional identity.');
}

console.log(`Verified ${requiredRoutes.length} required routes and homepage recovery invariants.`);
