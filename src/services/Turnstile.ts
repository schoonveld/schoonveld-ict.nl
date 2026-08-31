export interface TurnstileVerifyResult {
    success: boolean,
    error?: string,
}

export class TurnstileService {

    secret = import.meta.env.TURNSTILE_SECRET;

    async verify(token: string, remoteIp?: string): Promise<TurnstileVerifyResult> {
        const body = new URLSearchParams();
        body.append("secret", this.secret);
        body.append("response", token);
        if (remoteIp) {
            body.append("remoteip", remoteIp);
        }

        try {
            const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                method: "POST",
                body,
            });
            const data = await response.json() as { success: boolean, "error-codes"?: string[] };

            if (!data.success) {
                return { success: false, error: data["error-codes"]?.join(", ") ?? "Turnstile verification failed" };
            }

            return { success: true };
        } catch {
            return { success: false, error: "Unable to verify Turnstile response. Please try again later" };
        }
    }
}
