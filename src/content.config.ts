import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            excerpt: z.string().optional(),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            isFeatured: z.boolean().default(false),
            tags: z.array(z.string()).default([]),
            seo: z
                .object({
                    title: z.string().min(5).max(120).optional(),
                    description: z.string().min(15).max(160).optional(),
                    image: z
                        .object({
                            src: image(),
                            alt: z.string().optional()
                        })
                        .optional(),
                    pageType: z.enum(['website', 'article']).default('website')
                })
                .optional()
        })
});

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            seo: z
                .object({
                    title: z.string().min(5).max(120).optional(),
                    description: z.string().min(15).max(160).optional(),
                    image: z
                        .object({
                            src: image(),
                            alt: z.string().optional()
                        })
                        .optional(),
                    pageType: z.enum(['website', 'article']).default('website')
                })
                .optional()
        })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            isFeatured: z.boolean().default(false),
            seo: z
                .object({
                    title: z.string().min(5).max(120).optional(),
                    description: z.string().min(15).max(160).optional(),
                    image: z
                        .object({
                            src: image(),
                            alt: z.string().optional()
                        })
                        .optional(),
                    pageType: z.enum(['website', 'article']).default('website')
                })
                .optional()
        })
});

export const collections = { blog, pages, projects };
