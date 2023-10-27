import { Field as VeeField, Form as VeeForm } from "vee-validate"

export default {
	install(app) {
		app.component("VeeField", VeeField)
		app.component("VeeForm", VeeForm)
	}
}