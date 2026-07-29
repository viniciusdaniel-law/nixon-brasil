import { access, readFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { extname, join } from 'node:path';

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
  'dist/rss.xml',
  'dist/sitemap.xml',
  'dist/robots.txt',
];

for (const route of requiredRoutes) {
  await access(route, constants.R_OK);
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return nested.flat();
}

const [header, config, cms, pageSource, articleNames] = await Promise.all([
  readFile('src/components/Header.astro', 'utf8'),
  readFile('astro.config.mjs', 'utf8'),
  readFile('.pages.yml', 'utf8'),
  readFile('src/pages/index.astro', 'utf8'),
  readdir('src/content/artigos'),
]);

if (!config.includes("site: 'https://nixonbrazil.page'")) {
  throw new Error('O domínio canônico não está definido no Astro.');
}

if (!header.includes('<details class="nav-menu">') || header.includes('nav-open')) {
  throw new Error('O menu deve funcionar sem JavaScript e sem bloquear a página.');
}

if (!cms.includes('name: homePlacement') || !pageSource.includes("homePlacement === 'lead'")) {
  throw new Error('A posição dos artigos na página inicial não está ligada ao CMS.');
}

const articleSources = await Promise.all(
  articleNames
    .filter((name) => extname(name) === '.md')
    .map((name) => readFile(join('src/content/artigos', name), 'utf8')),
);

const leadCount = articleSources.filter((source) => source.includes('homePlacement: "lead"')).length;
if (leadCount !== 1) {
  throw new Error(`A página inicial precisa de uma matéria principal; foram encontradas ${leadCount}.`);
}

const generatedFiles = await filesIn('dist');
const htmlFiles = generatedFiles.filter((file) => extname(file) === '.html');

if (htmlFiles.length !== 15) {
  throw new Error(`O build deveria gerar 15 páginas HTML; gerou ${htmlFiles.length}.`);
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');

  if (!/<title>[^<]+<\/title>/.test(html)) {
    throw new Error(`Página sem título: ${file}`);
  }
  if (!/<meta name="description" content="[^"]+">/.test(html)) {
    throw new Error(`Página sem descrição: ${file}`);
  }
  if (!/<link rel="canonical" href="https:\/\/nixonbrazil\.page\//.test(html)) {
    throw new Error(`URL canônica incorreta: ${file}`);
  }
  if (html.includes('viniciusdaniel-law.github.io/nixon-brasil')) {
    throw new Error(`Endereço antigo encontrado: ${file}`);
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;

    const pathname = href.split(/[?#]/, 1)[0];
    const target = pathname === '/'
      ? 'dist/index.html'
      : pathname.endsWith('/')
        ? join('dist', pathname, 'index.html')
        : join('dist', pathname);

    await access(target, constants.R_OK).catch(() => {
      throw new Error(`Link interno sem destino em ${file}: ${href}`);
    });
  }
}

console.log(`Site verificado: ${htmlFiles.length} páginas, domínio, navegação, metadados e seleção editorial.`);
