import { Field as VeeField, Form as VeeForm, defineRule, ErrorMessage as VeeErrorMessage, configure } from "vee-validate";
import { required, min, max, alpha_spaces as alphaSpaces, email, numeric, confirmed, min_value as minValue, max_value as maxValue } from "@vee-validate/rules";

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
		defineRule("minValue", minValue);
		defineRule("maxValue", maxValue);
		defineRule("passwordsMismatch", confirmed);

		configure({
			generateMessage: ctx => {
				const messages = {
					required: `This field is required.`,
					min: `This field's value is too short.`,
					max: `This field's value is too long.`,
					alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
					email: `This field must be a valid email.`,
					numeric: `This field may only contain numeric characters.`,
					minValue: `This field's value is too low.`,
					maxValue: `This field's value is too high.`,
					passwordsMismatch: `The passwords do not match.`,
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