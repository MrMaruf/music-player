import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { firebaseCollections, auth } from '@/includes/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    async register(values) {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const uid = userCredentials.user.uid
      const userObject = {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        userType: values.userType
      }
      const newDocument = await doc(firebaseCollections.users, uid)
      await setDoc(newDocument, userObject)
      await updateProfile(userCredentials.user, {
        displayName: values.name
      })

      this.isLoggedIn = true
    },
    async login(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      this.isLoggedIn = true
    },
    async logout() {
      await auth.signOut()
      this.isLoggedIn = false
    }
  }
})
