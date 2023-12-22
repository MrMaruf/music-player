import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from '@/includes/validation'
import { auth } from "@/includes/firebase"

import App from './App.vue'
import router from './router'

let app;
auth.onAuthStateChanged(() => {
	if (app !== undefined) return;
	app = createApp(App)

	app.use(router)
	app.use(createPinia())
	app.use(VeeValidatePlugin)

	app.mount('#app')
});


