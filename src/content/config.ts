import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(), // Automatically parses string dates from gray-matter
    description: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
