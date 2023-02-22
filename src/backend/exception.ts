/**
 * map<`ErrorCode`, `GenericMessage`>
 */
const CLIENT_ERROR_CODE_MAP = {
	"sms-failed": "Unable to send sms to the intended receipient(s)",
	"invalid-input-format":
		"The input is in an invalid format. Correct before trying again",
};

type ClientErrorCode = keyof typeof CLIENT_ERROR_CODE_MAP;

export class ClientError<Code extends ClientErrorCode> extends Error {
	public code: string;
	constructor(p: { message?: string; code: Code }) {
		super(
			p.message ?? CLIENT_ERROR_CODE_MAP[p.code] ?? "Unknown client error"
		);
		this.code = p.code ?? "error-unknown";
		this.name = "ClientError";
	}
}
