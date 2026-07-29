import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Nixon Brasil'),
    category: z.enum([
      'Biografia',
      'Presidência',
      'Política externa',
      'Nixon e o Brasil',
      'Discursos',
      'Acervo',
    ]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverCredit: z.string().optional(),
    sourceUrl: z.url().optional(),
    homePlacement: z.enum(['lead', 'rail', 'none']).default('none'),
    draft: z.boolean().default(true),
  }),
});

const documentos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/documentos' }),
  schema: z.object({
    title: z.string(),
    originalTitle: z.string().optional(),
    date: z.coerce.date(),
    format: z.enum([
      'Memorando',
      'Discurso',
      'Comunicado',
      'Tratado',
      'Coleção',
      'Página institucional',
      'Fotografia',
      'Gravação',
      'Vídeo',
      'Lei',
    ]),
    category: z.enum(['Biografia', 'Presidência', 'Política externa', 'Nixon e o Brasil']),
    archive: z.string().optional(),
    reference: z.string().optional(),
    originalUrl: z.url(),
    translationStatus: z.enum([
      'Original em inglês',
      'Tradução em preparação',
      'Tradução editorial publicada',
    ]).default('Original em inglês'),
    description: z.string().optional(),
  }),
});

export const collections = { artigos, documentos };
