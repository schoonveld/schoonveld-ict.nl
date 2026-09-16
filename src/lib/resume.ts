import { getCollection, render } from "astro:content";

import { getUiTranslations } from "@/lib/i18n";

const parseDate = (value: string) =>
	value.toLowerCase() === "present" ? Date.now() : Date.parse(value);

export async function getResumeData(locale: "nl" | "en") {
	const t = await getUiTranslations(locale);

	const introEntry = (await getCollection(locale === "en" ? "resumeIntroEn" : "resumeIntroNl"))[0];
	const { Content: IntroContent } = await render(introEntry);

	const entries = (await getCollection(locale === "en" ? "resumeEn" : "resumeNl")).sort(
		(a, b) => parseDate(b.data.from) - parseDate(a.data.from),
	);

	const items = await Promise.all(
		entries.map(async (entry) => ({ entry, Content: (await render(entry)).Content })),
	);

	const education = (
		await getCollection(locale === "en" ? "resumeEducationEn" : "resumeEducationNl")
	)
		.sort((a, b) => a.data.order - b.data.order)
		.map((entry) => entry.data);

	const certifications = (
		await getCollection(locale === "en" ? "resumeCertificationsEn" : "resumeCertificationsNl")
	)
		.sort((a, b) => a.data.order - b.data.order)
		.map((entry) => entry.data);

	return { t, introEntry, IntroContent, items, education, certifications };
}
