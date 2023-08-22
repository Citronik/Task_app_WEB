<template>
  <v-sheet id="register" class="bg-grey-lighten-2 pa-16" rounded>
    <v-card 
    class="mx-auto px-6 py-8" 
    max-width="400"
    title="Registration"
    >

      <v-form
        v-model="regForm"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[rules.required, rules.email]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="[rules.required, rules.username]"
          class="mb-2"
          clearable
          label="Username"
        ></v-text-field>

        <v-text-field
          v-model="first"
          :readonly="loading"
          class="mb-2"
          clearable
          label="First name"
        ></v-text-field>

        <v-text-field
          v-model="last"
          :readonly="loading"
          class="mb-2"
          clearable
          label="Last name"
        ></v-text-field>
        
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          :readonly="loading"
          class="mb-2"
          clearable
          label="Password"
          placeholder="Enter your password"
          @click:append="show1 = !show1"
        ></v-text-field>
        
        <br>
        
        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>

        <br>

        <v-btn
          :disabled="!regForm"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign Up
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { useUserStore } from "../store/UserStore";
  export default {
    setup() {
    const userStore = useUserStore();
    userStore.initialize();
    return { userStore };
  },
    data: () => ({
      regForm: false,
      username: null,
      first: null,
      last: null,
      email: null,
      password: null,
      show1: false,
      show2: true,
      terms: false,
      loading: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          username: value => {
            const pattern = /^[a-zA-Z0-9]+$/;
            return pattern.test(value) || 'Invalid username. Use only letters and numbers.'
          },
        },
    }),

    methods: {
      async onSubmit () {
        if (!this.regForm) return

        this.loading = true
        console.log('user has submited the form');
        setTimeout(() => (this.loading = false), 2000)
        const res = await this.register();
        if (!res.error) {
          this.$router.push("/login");
        } else {
          //add alert
          console.log(res.error);
        }
      },
      required (v) {
        return !!v || 'Field is required'
      },
      async register() {
        console.log('register was called');
        const credentials = {
          username: this.username,
          first_name: this.first,
          last_name: this.last,
          email: this.email,
          password: this.password,
        };
        var res = await this.userStore.signUp( JSON.stringify(credentials) );
        return res;
      },
      async getProfile() {
        var res = await this.userStore.fetchProfile();
        return res;
      },
    },
  }
</script>

<style>
#register {
  width: 100%;
  height: 100%;
}
</style>