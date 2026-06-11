import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { reference } from "astro:content";

const blogCollection = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    // type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: image(),

        // relación
        // author: z.string(),
        author: reference('author'),

        // Relación
        tags: z.array(z.string()),

        // Boolean
        isDraft: z.boolean().default(false),
    })
});

const authorCollection = defineCollection({
    loader: glob({ base: './src/content/author', pattern: '**/*.{yml,yaml}' }),
    // type: 'data',
    schema: ({ image }) => z.object({
        name: z.string(),
        avatar: image(),
        twitter: z.string(),
        linkedIn: z.string(),
        github: z.string(),
        bio: z.string(),
        subtitle: z.string(),
    })
})

export const collections = {
    blog: blogCollection,
    author: authorCollection,
};