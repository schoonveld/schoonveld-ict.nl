import { ActionError, defineAction } from "astro:actions";
import { EmailService } from "@/services/Resend";
import { z } from "astro/zod";

const emailService = new EmailService();

export const server = {
    contactAction: defineAction({
        accept: "form",
        input: z.object({
            email: z.string(),
            name: z.string(),
            company: z.string().min(1),
            message: z.string(),
          }),
          handler: async (input, context) => {
            const formData = await context.request.formData();
            // const turnstileResponse = formData.get("cf-turnstile-response");

            // if(turnstileResponse === null) {
            //     throw new ActionError({
            //         code: "BAD_REQUEST",
            //         message: "No turstile response was provided"
            //     });
            // }

            // const { error: verifyError } = await verify({
            //     response: turnstileResponse.toString(),
            //     remoteip: context.clientAddress
            // });
            
            // if(verifyError) {
            //     throw new ActionError({
            //         code: "INTERNAL_SERVER_ERROR",
            //         message: verifyError.message
            //     });
            // }

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