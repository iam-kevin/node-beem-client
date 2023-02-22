import { escape } from "querystring";
import type { BeemClient } from "../backend";
import { ClientError } from "../backend/exception";
import { normalizePhoneNumber, phoneRegex } from "../utils/phone";
import * as z from "zod";

// cconfigurations
const zConfig = z.object({
	source: z.union([
		z.literal("AUTHINFO"),
		z.literal("INFO"),
		z.literal("at.Biashara"),
	]),
	message: z.string(),
	recipients: z
		.array(z.string().regex(phoneRegex()).trim())
		.min(1, "There should be atleast one recipient of the message"),
});
type SendConfig = z.infer<typeof zConfig>;

/**
 * Sends message to recipient(s) entered in the input parameters
 * @param client
 * @param message
 * @param config
 * @returns
 */
export async function sendSMS<SC extends SendConfig>(
	client: BeemClient,
	params: SC
) {
	try {
		const { source, recipients, message } = zConfig.parse(params);
		const res = await client.axios().post("/send", {
			source_addr: source,
			schedule_time: "",
			encoding: "0",
			message: message,
			recipients: recipients.map((rc, ix) => ({
				recipient_id: ix + 1,
				dest_addr: normalizePhoneNumber(rc),
			})),
		});

		return await res.data;
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw new ClientError({
				code: "invalid-input-format",
				message:
					"Input for send message is incorrect. See more \n\n" +
					(err as z.ZodError).flatten().fieldErrors,
			});
		}

		throw new ClientError({
			code: "sms-failed",
		});
	}
}
