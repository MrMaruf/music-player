import { defineStore } from 'pinia'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { firebaseCollections } from '@/includes/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    async register(values) {
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, values.email, values.password)

      const userObject = {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        userType: values.userType
      };

      await addDoc(firebaseCollections.users, userObject);

      this.isLoggedIn = true
    },
    async login(values) {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, values.email, values.password)
      this.isLoggedIn = true
    }
  }
})
