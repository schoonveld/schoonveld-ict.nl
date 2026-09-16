interface TurnstileRenderOptions {
	sitekey: string;
	theme?: "auto" | "light" | "dark";
	callback?: (token: string) => void;
	"expired-callback"?: () => void;
	"error-callback"?: (errorCode?: string) => void;
}

interface Window {
	turnstile?: {
		render: (container: HTMLElement, options: TurnstileRenderOptions) => string | null | undefined;
		reset: (widgetId?: string) => void;
		remove: (widgetId?: string) => void;
		getResponse: (widgetId?: string) => string | undefined;
	};
	onloadTurnstileCallback?: () => void;
}
