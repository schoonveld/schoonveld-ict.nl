import { useEffect, useRef, useState } from "react";
import { actions } from "astro:actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

interface FormTranslations {
	name: string;
	namePlaceholder: string;
	nameError: string;
	email: string;
	emailPlaceholder: string;
	emailError: string;
	company: string;
	companyPlaceholder: string;
	companyError: string;
	message: string;
	messagePlaceholder: string;
	messageError: string;
	submit: string;
	successEyebrow: string;
	successHeading: string;
	successBody: string;
	errorEyebrow: string;
	errorHeading: string;
	errorBody: string;
}

interface ContactFormProps {
	siteKey: string;
	translations: FormTranslations;
}

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
// render=explicit + onload=onloadTurnstileCallback: Cloudflare's documented
// pattern for rendering the widget ourselves instead of its DOM auto-scan.
const TURNSTILE_SCRIPT_SRC =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit";

function loadTurnstileScript(onReady: () => void) {
	if (window.turnstile) {
		onReady();
		return;
	}
	window.onloadTurnstileCallback = onReady;
	if (document.getElementById(TURNSTILE_SCRIPT_ID)) return;

	const script = document.createElement("script");
	script.id = TURNSTILE_SCRIPT_ID;
	script.src = TURNSTILE_SCRIPT_SRC;
	script.async = true;
	script.defer = true;
	document.head.appendChild(script);
}

export default function ContactForm({ siteKey, translations: t }: ContactFormProps) {
	const [status, setStatus] = useState<Status>("idle");
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const turnstileContainerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);

	useEffect(() => {
		loadTurnstileScript(() => {
			if (!turnstileContainerRef.current || widgetIdRef.current) return;
			widgetIdRef.current = window.turnstile?.render(turnstileContainerRef.current, {
				sitekey: siteKey,
				theme: "auto",
				callback: (token) => setTurnstileToken(token),
				"expired-callback": () => setTurnstileToken(null),
				"error-callback": () => setTurnstileToken(null),
			}) ?? null;
		});

		return () => {
			if (widgetIdRef.current) {
				window.turnstile?.remove(widgetIdRef.current);
				widgetIdRef.current = null;
			}
		};
	}, [siteKey]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!e.currentTarget.reportValidity()) return;
		if (!turnstileToken) return;

		setStatus("submitting");
		const { error } = await actions.contactAction(new FormData(e.currentTarget));
		setStatus(error ? "error" : "success");
		window.turnstile?.reset(widgetIdRef.current ?? undefined);
		setTurnstileToken(null);
	}

	if (status === "success") {
		return (
			<div className="py-10 text-center" aria-live="polite">
				<p className="font-mono text-sm text-gold-600 dark:text-gold-400">
					{t.successEyebrow}
				</p>
				<p className="mt-3 text-xl font-bold">{t.successHeading}</p>
				<p className="mt-2 text-muted-foreground">{t.successBody}</p>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="py-10 text-center" aria-live="polite">
				<p className="font-mono text-sm text-error">{t.errorEyebrow}</p>
				<p className="mt-3 text-xl font-bold">{t.errorHeading}</p>
				<p className="mt-2 text-muted-foreground">{t.errorBody}</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="grid gap-5 sm:grid-cols-2"
			noValidate={true}
		>
			<div className="flex flex-col gap-2">
				<Label htmlFor="name">{t.name}</Label>
				<Input
					id="name"
					name="name"
					type="text"
					placeholder={t.namePlaceholder}
					required
					errorMessage={t.nameError}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="email">{t.email}</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder={t.emailPlaceholder}
					required
					errorMessage={t.emailError}
				/>
			</div>
			<div className="flex flex-col gap-2 sm:col-span-2">
				<Label htmlFor="company">{t.company}</Label>
				<Input
					id="company"
					name="company"
					type="text"
					placeholder={t.companyPlaceholder}
					required
					errorMessage={t.companyError}
				/>
			</div>
			<div className="flex flex-col gap-2 sm:col-span-2">
				<Label htmlFor="message">{t.message}</Label>
				<Textarea
					id="message"
					name="message"
					placeholder={t.messagePlaceholder}
					rows={5}
					required
					errorMessage={t.messageError}
				/>
			</div>
			<div className="sm:col-span-2 flex flex-wrap justify-between items-center gap-4">
				<div ref={turnstileContainerRef} />
				<Button
					type="submit"
					size="lg"
					className="w-full sm:w-auto"
					disabled={status === "submitting" || !turnstileToken}
				>
					{t.submit}
				</Button>
			</div>
		</form>
	);
}
