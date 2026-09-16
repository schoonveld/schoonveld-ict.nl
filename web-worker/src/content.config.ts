import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod"

const resumeSchema = z.object({
	from: z.string(),
	until: z.string(),
	company: z.string(),
	"job-title": z.string(),
});

const resumeIntroSchema = z.object({
	eyebrow: z.string(),
	title: z.string(),
	subtitle: z.string(),
});

const educationSchema = z.object({
	school: z.string(),
	degree: z.string(),
	year: z.string(),
	order: z.number(),
});

const certificationSchema = z.object({
	name: z.string(),
	detail: z.string(),
	order: z.number(),
});

const uiSchema = z.object({
	meta: z.object({
		description: z.string(),
	}),
	navigation: z.object({
		home: z.string(),
		resume: z.string(),
		cta: z.string(),
		switchLocale: z.string(),
	}),
	hero: z.object({
		eyebrow: z.string(),
		title: z.string(),
		description: z.string(),
		ctaPrimary: z.string(),
		ctaSecondary: z.string(),
	}),
	contact: z.object({
		eyebrow: z.string(),
		title: z.string(),
		description: z.string(),
		emailLabel: z.string(),
		basedInLabel: z.string(),
		location: z.string(),
	}),
	form: z.object({
		name: z.string(),
		namePlaceholder: z.string(),
		nameError: z.string(),
		email: z.string(),
		emailPlaceholder: z.string(),
		emailError: z.string(),
		company: z.string(),
		companyPlaceholder: z.string(),
		companyError: z.string(),
		message: z.string(),
		messagePlaceholder: z.string(),
		messageError: z.string(),
		submit: z.string(),
		successEyebrow: z.string(),
		successHeading: z.string(),
		successBody: z.string(),
		errorEyebrow: z.string(),
		errorHeading: z.string(),
		errorBody: z.string(),
	}),
	resume: z.object({
		downloadCta: z.string(),
		workEyebrow: z.string(),
		workTitle: z.string(),
		skillsTitle: z.string(),
		educationEyebrow: z.string(),
		educationTitle: z.string(),
		certEyebrow: z.string(),
		certTitle: z.string(),
	}),
	footer: z.object({
	}),
});

const resumeNl = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/nl/experience" }),
	schema: resumeSchema,
});

const resumeIntroNl = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/nl/intro" }),
	schema: resumeIntroSchema,
});

const resumeEn = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/en/experience" }),
	schema: resumeSchema,
});

const resumeIntroEn = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/en/intro" }),
	schema: resumeIntroSchema,
});

const resumeEducationNl = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/nl/education" }),
	schema: educationSchema,
});

const resumeEducationEn = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/en/education" }),
	schema: educationSchema,
});

const resumeCertificationsNl = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/nl/certifications" }),
	schema: certificationSchema,
});

const resumeCertificationsEn = defineCollection({
	loader: glob({ pattern: "*.md", base: "./content/resume/en/certifications" }),
	schema: certificationSchema,
});

const ui = defineCollection({
	loader: glob({ pattern: "*.json", base: "./content/ui" }),
	schema: uiSchema,
});

export const collections = {
	ui,
	resumeNl,
	resumeIntroNl,
	resumeEn,
	resumeIntroEn,
	resumeEducationNl,
	resumeEducationEn,
	resumeCertificationsNl,
	resumeCertificationsEn,
};
