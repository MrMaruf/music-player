import { Field as VeeField, Form as VeeForm, defineRule, ErrorMessage as VeeErrorMessage, configure } from "vee-validate";
import { required, min, max, alpha_spaces as alphaSpaces, email, numeric, confirmed, min_value, max_value } from "@vee-validate/rules";

export default {
	install(app) {
		app.component("VeeField", VeeField);
		app.component("VeeForm", VeeForm);
		app.component("ErrorMessage", VeeErrorMessage);

		defineRule("required", required);
		defineRule("tos", required);
		defineRule("min", min);
		defineRule("max", max);
		defineRule("alphaSpaces", alphaSpaces);
		defineRule("email", email);
		defineRule("numeric", numeric);
		defineRule("min_value", min_value);
		defineRule("max_value", max_value);
		defineRule("passwords_mismatch", confirmed);

		configure({
			generateMessage: ctx => {
				const messages = {
					required: `This field is required.`,
					min: `The field ${ctx.field} is too short.`,
					max: `The field ${ctx.field} is too long.`,
					alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
					email: `The field ${ctx.field} must be a valid email.`,
					numeric: `The field ${ctx.field} may only contain numeric characters.`,
					min_value: `The field ${ctx.field} is too low.`,
					max_value: `The field ${ctx.field} is too high.`,
					passwords_mismatch: `The passwords do not match.`,
					tos: `You must accept the Terms of Service.`,
				};

				const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;

				return message;
			},
			validateOnBlur: true,
			validateOnChange: true,
			validateOnInput: false,
			validateOnModelUpdate: true,
		})

	}
}