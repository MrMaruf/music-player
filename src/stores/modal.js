import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
	state: () => ({
		isOpen: false,
	}),
	actions: {
		openModal() {
			this.isOpen = true;
		},
		closeModal() {
			this.isOpen = false;
		},
		toggleModal() {
			this.isOpen = !this.isOpen;
		}
	},
	getters: {
		hiddenClass(state) {
			return state.isOpen === true ? "" : "hidden";
		}
	}
})
