import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const proyectos = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/proyectos" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        technologies: z.array(z.string()).optional(),
        link: z.string().optional(),
    }),
});

export const collections = { 'proyectos': proyectos };