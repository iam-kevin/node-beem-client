// contains functions that hace useful text utilities

import invariant from "tiny-invariant";

/**
 * Regular expression to identify the parameters in the text be replaced.
 * Currently, this is set to identify: `%var%`
 * @returns
 */
const parameterPattern = () => /\%([a-zA-Z_$]\w*){1,}\%/g;

/**
 * Replaces the variables identified with `parameterPattern(): RegExp` on the text with
 * suitable values. Useful for creating generic text like OTP message, with values you can replace
 * @param text Text containing parameters to replace
 * @param params key-value pairs containing the replacing values
 * @returns Text with the parameterized values already replaced
 */
export const paramedText = function <
	Vars extends Record<string, string | null>
>(text: string, params: Vars = {} as Vars) {
	// place where the new text will be
	let ptext = "";

	// offset index when new values are replaced
	let indexOffset = 0;

	for (const item of text.matchAll(parameterPattern())) {
		const param = item[1];
		ptext += text.substring(indexOffset + ptext.length, item.index ?? 0);
		const value = params[param];

		invariant(
			value !== undefined,
			() =>
				`Parameter '${param}' missing, please make sure to include it. If values should be left unparameterized, explicity define using 'null'.`
		);
		const _value = String(value ?? item[0]);
		ptext += _value;
		indexOffset = item[1].length - _value.length + 2;
	}

	return ptext;
};
