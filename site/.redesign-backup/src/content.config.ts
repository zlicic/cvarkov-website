import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const episodes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/episodes' }),
  schema: z.object({
    title: z.string(),
    series: z.string().default('Čvarkov Objasnjava'),
    season: z.number(),
    episodeNumber: z.number(),
    region: z.string(),
    village: z.string().optional(),
    releaseDate: z.coerce.date(),
    type: z.enum(['episode', 'teaser', 'season-announcement']).default('episode'),
    youtubeUrl: z.string().url().optional(),
    thumbnail: z.string().url().optional(),
    description: z.string(),
    body: z.string().default(''),
    featured: z.boolean().default(false),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
    order: z.number().default(0),
  }),
});

const shows = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/shows' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    venue: z.string(),
    city: z.string(),
    ticketUrl: z.string().url().optional(),
    status: z.enum(['upcoming', 'sold-out', 'cancelled', 'declined']).default('upcoming'),
  }),
});

const bio = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/bio' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    photo: z.string().url(),
    instagram: z.string().url(),
    youtube: z.string().url(),
    facebook: z.string().url(),
  }),
});

export const collections = { episodes, series, shows, bio };
