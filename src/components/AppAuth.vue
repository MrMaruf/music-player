<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" :class="hiddenClass" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="closeModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register'
                }"
                href="#"
                @click.prevent="tab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login'
                }"
                href="#"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>
          <div
            class="text-white text-center font-bold p-4 rounded mb-4"
            v-if="showAlert"
            :class="alertVariant"
          >
            {{ alertMsg }}
          </div>
          <!-- Login Form -->
          <auth-login :submitDisabled="inSubmission" @submit="login" v-show="tab === 'login'" />
          <!-- Registration Form -->
          <auth-register
            :submitDisabled="inSubmission"
            @submit="register"
            v-show="tab === 'register'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import AuthRegister from '@/components/auth/AuthRegister.vue'
import AuthLogin from '@/components/auth/AuthLogin.vue'

export default {
  name: 'AppAuth',
  setup() {},
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
    ...mapActions(useModalStore, ['closeModal']),
    ...mapActions(useUserStore, {
      createUser: 'register',
      logInUser: 'login'
    }),
    async register(values) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVariant = 'bg-blue-500'
      this.alertMsg = 'Please wait!'
      let userCredentials = null

      try {
        await this.createUser(values)
      } catch (error) {
        console.log('Error creating account', error)
        this.inSubmission = false
        this.alertVariant = 'bg-red-500'
        this.alertMsg = 'An unexpected error occured. Please try again later'
        return
      }

      this.alertVariant = 'bg-green-500'
      this.alertMsg = 'Success!'
      this.inSubmission = false
      console.log(userCredentials)
    },
    async login(values) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVariant = 'bg-blue-500'
      this.alertMsg = 'Please wait! Logging in...'
      console.log(values)

      try {
        await this.logInUser(values)
      } catch (error) {
        console.log('Error logging in', error)
        this.inSubmission = false
        this.alertVariant = 'bg-red-500'
        this.alertMsg = 'An unexpected error occured. Please try again later'
        return
      }
      this.alertVariant = 'bg-green-500'
      this.alertMsg = 'Success! Logged in!'
      setTimeout(() => {
        this.inSubmission = false
        this.showAlert = false
        this.closeModal()
      }, 1000)
    }
  },
  computed: {
    ...mapState(useModalStore, ['hiddenClass'])
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
