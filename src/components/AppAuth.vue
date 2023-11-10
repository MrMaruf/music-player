<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" :class="[modalStore.isOpen ? 'hidden' : '']" id="modal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="modalStore.isOpen = !modalStore.isOpen">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition" :class="{
                'hover:text-white text-white bg-blue-600': tab === 'login',
                'hover:text-blue-600': tab === 'register'
              }" href="#" @click.prevent="tab = 'login'">Login</a>
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition" :class="{
                'hover:text-white text-white bg-blue-600': tab === 'register',
                'hover:text-blue-600': tab === 'login'
              }" href="#" @click.prevent="tab = 'register'">Register</a>
            </li>
          </ul>
          <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="showAlert" :class="alertVariant">
            {{ alertMsg }}
          </div>
          <!-- Login Form -->
          <auth-login :submitDisabled="inSubmission" @submit="login" v-show="tab === 'login'" />
          <!-- Registration Form -->
          <auth-register :submitDisabled="inSubmission" @submit="register" v-show="tab === 'register'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useModalStore } from '@/stores/modal';
import AuthRegister from '@/components/auth/AuthRegister.vue';
import AuthLogin from '@/components/auth/AuthLogin.vue';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseCollections } from "@/includes/firebase";
import { addDoc } from "firebase/firestore";


export default {
  name: 'AppAuth',
  setup() {
    const modalStore = useModalStore()

    return { modalStore }
  },
  data() {
    return {
      tab: 'login',
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMsg: 'Please wait!'
    }
  },
  methods: {
    closeModal() {
      this.modalStore.closeModal()
    },
    async register(values) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVariant = 'bg-blue-500'
      this.alertMsg = 'Please wait!'
      let userCredentials = null;
      const auth = getAuth();
      try {
        userCredentials = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
      }
      catch (error) {
        console.log('Error creating account', error)
        this.inSubmission = false;
        this.alertVariant = "bg-red-500";
        this.alertMsg = 'An unexpected error occured. Please try again later';
        return;
      }

      try {
        const docRef = await addDoc(firebaseCollections.users, {
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
          userType: values.userType
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      this.alertVariant = 'bg-green-500'
      this.alertMsg = 'Success!'
      this.inSubmission = false
      console.log(userCredentials);
    },
    login(values) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVariant = 'bg-blue-500'
      this.alertMsg = 'Please wait! Logging in...'
      console.log(values)

      this.alertVariant = 'bg-green-500'
      this.alertMsg = 'Success! Logged in!'
      this.modalStore.closeModal()
    }
  },
  computed: {
    hiddenClass() {
      return this.modalStore.hiddenClass
    }
  },
  components: {
    AuthRegister,
    AuthLogin
  }
}
</script>

<style>
/* Your CSS styles here */
</style>
