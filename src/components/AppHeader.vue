<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!isLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <!-- <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Logout</a> -->
              <a class="px-2 text-white" href="#" @click.prevent="logout">Logout</a>
            </li>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
          </template>
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'

export default {
  name: 'AppHeader',
  methods: {
    ...mapActions(useModalStore, ['toggleModal']),
    ...mapActions(useUserStore, ['logout'])
  },
  computed: {
    ...mapWritableState(useUserStore, ['isLoggedIn'])
  }
}
</script>

<style>
/* Your component's styles go here */
</style>
