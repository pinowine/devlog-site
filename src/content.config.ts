import { defineCollection } from "astro:content";
import { z } from "astro/zod";

import { file } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

// 定义集合
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      tags: z.array(z.string()).optional(),
      readTime: z.string().optional(),
      father: z.string().optional(),
      lastUpdated: z.coerce.date().optional().nullable(),
      giscus: z.boolean().optional().default(false),
    }),
  }),
});

const projects = defineCollection({
  loader: file("src/content/data/meta.yaml"),
  schema: z.object({
    date: z.coerce.date(),
    description: z.string(),
    progress: z.number(),
    status: z.string(),
    tags: z.array(z.string()),
    title: z.string(),
    type: z.enum(["game", "web"]),
    id: z.string(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = {
  docs,
  projects,
};
