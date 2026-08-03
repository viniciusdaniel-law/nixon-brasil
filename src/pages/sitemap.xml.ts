import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL }) {
  const base = import.meta.env.BASE_URL;
  const staticRoutes = [
    '', 'biografia/', 'presidencia/', 'politica-externa/', 'brasil/', 'acervo/', 'artigos/',
    'cronologia/', 'discursos/', 'pessoas/', 'temas/', 'galerias/', 'videos/', 'sobre/',
  ];
  const [articles, documents, speeches, people, themes, galleries] = await Promise.all([
    getCollection('artigos', ({ data }) => !data.draft),
    getCollection('documentos', ({ data }) => !data.draft),
    getCollection('discursos', ({ data }) => !data.draft),
    getCollection('pessoas', ({ data }) => !data.draft),
    getCollection('temas', ({ data }) => !data.draft),
    getCollection('galerias', ({ data }) => !data.draft),
  ]);
  const urls = [
    ...staticRoutes.map((route) => new URL(`${base}${route}`, site).toString()),
    ...articles.map((article) => new URL(`${base}artigos/${article.id}/`, site).toString()),
    ...documents.map((document) => new URL(`${base}acervo/${document.id}/`, site).toString()),
    ...speeches.map((speech) => new URL(`${base}discursos/${speech.id}/`, site).toString()),
    ...people.map((person) => new URL(`${base}pessoas/${person.id}/`, site).toString()),
    ...themes.map((theme) => new URL(`${base}temas/${theme.id}/`, site).toString()),
    ...galleries.map((gallery) => new URL(`${base}galerias/${gallery.id}/`, site).toString()),
  ];
  const body = urls.map((url) => `<url><loc>${url}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
