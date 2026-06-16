import { useState } from "react";
import { actions } from "astro:actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";


export default function ContactForm() {
	const [status, setStatus] = useState<Status>("idle");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!e.currentTarget.reportValidity()) return;


		
		setStatus("submitting");
		const { error } = await actions.contactAction(new FormData(e.currentTarget));
		setStatus(error ? "error" : "success");
	}

	if (status === "success") {
		return (
			<div className="py-10 text-center" aria-live="polite">
				<p className="font-mono text-sm text-gold-600 dark:text-gold-400">
					// message received
				</p>
				<p className="mt-3 text-xl font-bold">Thanks for reaching out!</p>
				<p className="mt-2 text-muted-foreground">
					I will get back to you within one business day.
				</p>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="py-10 text-center" aria-live="polite">
				<p className="font-mono text-sm text-error">// error</p>
				<p className="mt-3 text-xl font-bold">Something went wrong</p>
				<p className="mt-2 text-muted-foreground">
					An unexpected error occurred while sending your request. Please try again later.
				</p>
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
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					name="name"
					type="text"
					placeholder="Your name"
					required
					errorMessage="Please enter your name"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="you@company.com"
					required
					errorMessage="Please enter a valid email"
				/>
			</div>
			<div className="flex flex-col gap-2 sm:col-span-2">
				<Label htmlFor="company">Company</Label>
				<Input
					id="company"
					name="company"
					type="text"
					placeholder="Your company"
					required
					errorMessage="Please enter your company"
				/>
			</div>
			<div className="flex flex-col gap-2 sm:col-span-2">
				<Label htmlFor="message">Message</Label>
				<Textarea
					id="message"
					name="message"
					placeholder="What would you like to build?"
					rows={5}
					required
					errorMessage="Please enter your message"
				/>
			</div>
			<div className="sm:col-span-2">
				<Button
					type="submit"
					size="lg"
					className="w-full sm:w-auto"
					disabled={status === "submitting"}
				>
					Send message
				</Button>
			</div>
		</form>
	);
}
