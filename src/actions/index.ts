import { ActionError, defineAction } from "astro:actions";
import { EmailService } from "@/services/Resend";
import { TurnstileService } from "@/services/Turnstile";
import { z } from "astro/zod";

const emailService = new EmailService();
const turnstileService = new TurnstileService();

export const server = {
    contactAction: defineAction({
        accept: "form",
        input: z.object({
            email: z.string(),
            name: z.string(),
            company: z.string().min(1),
            message: z.string(),
            "cf-turnstile-response": z.string().min(1, "Turnstile verification is required"),
          }),
          handler: async (input, context) => {
            const { success, error: turnstileError } = await turnstileService.verify(
                input["cf-turnstile-response"],
                context.clientAddress
            );

            if (!success) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: turnstileError ?? "Turnstile verification failed"
                });
            }

            const { id, error: emailError } = await emailService.sendContactEmail(input);
            if(emailError) {
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: emailError
                });
            }

            return {
                data: id,
                error: undefined
            };
        }
    })
};