import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const resume = defineCollection({
	loader: glob({ pattern: "*.md", base: "./resume" }),
	schema: z.object({
		from: z.string(),
		until: z.string(),
		company: z.string(),
		"job-title": z.string(),
	}),
});

export const collections = { resume };
