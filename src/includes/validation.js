import { Field as VeeField, Form as VeeForm, defineRule, ErrorMessage as VeeErrorMessage } from "vee-validate";
import { required, min, max, alpha_spaces as alphaSpaces, email, numeric, confirmed, min_value, max_value } from "@vee-validate/rules";

export default {
	install(app) {
		app.component("VeeField", VeeField);
		app.component("VeeForm", VeeForm);
		app.component("ErrorMessage", VeeErrorMessage);

		defineRule("required", required);
		defineRule("min", min);
		defineRule("max", max);
		defineRule("alphaSpaces", alphaSpaces);
		defineRule("email", email);
		defineRule("numeric", numeric);
		defineRule("min_value", min_value);
		defineRule("max_value", max_value);
		defineRule("confirmed", confirmed);

	}
}