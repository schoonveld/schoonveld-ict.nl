import { Resend } from "resend";

export interface ContactInput {
    email: string,
    name: string,
    company: string,
    message: string,
}

export interface ContactOutput {
    id?: string,
    error?: string,
}

export class EmailService {

    resend = new Resend(import.meta.env.RESEND_API_KEY);

    async sendContactEmail(input: ContactInput): Promise<ContactOutput> {
        // return Promise.resolve({id: "123", error: "It went wrong"});
            const { data, error } = await this.resend.emails.send({
                from: "Schoonveld-ICT <noreply@schoonveld-ict.nl>",
                to: ["steffen@schoonveld-ict.nl"],
                subject: "Contact - Schoonveld-ICT-.nl",
                html: `<h2>Contact - Schoonveld-ICT.nl</h2
                <p>Er is een bericht verstuurd via het contact formulier op Schoonveld-ICT.nl.</p>
                <p><span style="font-weight:bold">Naam: </span>${input.name}</p>
                <p><span style="font-weight:bold">Email: </span>${input.email}</p>
                <p><span style="font-weight:bold">Bedrijf: </span>${input.company}</p>
                <p><span style="font-weight:bold">Bericht: </span>${input.message}</p>
                `,});
            if(error) {
                return Promise.reject({id: null, error: "Unable to send email. Please try again later"});
            }
            
            return Promise.resolve({id: data?.id, error: undefined})
    }
}