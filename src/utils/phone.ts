import invariant from "tiny-invariant";

/**
 * Tanzania phoneNumber regular expression.
 * @returns
 */
export const phoneRegex = () => /(^((\+?255)|0)\d{9}$)/g;

/**
 * Cleas the numbers with spaces
 * @param phone
 */
export const normalizePhoneNumber = function (phone: string) {
	// is string assertion
	invariant(
		typeof phone === "string",
		"Invalid type for input. Make sure it's string"
	);

	let phoneNumber = phone.replace(/\s+/g, "").trim();

	// assertion
	invariant(
		phoneRegex().test(phoneNumber),
		"Input is not a valid tanzanian phone number."
	);

	return phoneNumber.replace(/^((\+?255)|0)/g, "255");
};
