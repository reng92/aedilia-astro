import { defineCollection, z } from 'astro:content';

const portfolio = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    category: z.enum(['asfalto', 'segnaletica', 'strade', 'tlc', 'acquedotto', 'arredo']),
    location: z.string(),
    image: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { portfolio };
