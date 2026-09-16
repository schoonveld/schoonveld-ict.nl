import { getCollection } from "astro:content";

export async function getUiTranslations(locale: string | undefined) {
	const entries = await getCollection("ui");
	const id = locale ?? "nl";
	const entry = entries.find((e) => e.id === id || e.id === `${id}.json`);
	if (!entry) throw new Error(`No UI translations for locale: ${id}`);
	return entry.data;
}

export type UiTranslations = Awaited<ReturnType<typeof getUiTranslations>>;
