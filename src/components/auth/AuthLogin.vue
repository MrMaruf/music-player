<template>
  <vee-form @submit="onSubmit" :validation-schema="schema">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-500" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-500" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="submitDisabled"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'AuthLogin',
  props: ['submitDisabled'],
  data() {
    return {
      schema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:8'
      }
    }
  },
  methods: {
    onSubmit(values) {
      this.$emit('submit', values)
    }
  },
  emits: {
    submit(payload) {
      return payload
    }
  }
}
</script>

<style>
/* Your component's styles go here */
</style>
