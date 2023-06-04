// /store/user.js
import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
    err: null,
    token: null,
  }),

  actions: {
    async fetchUser() {
      console.log('getting user');

      try {
        console.log(this.token);
        const res = await apiClient.get('/users/me');
        this.user = res.data.data;
        return this.user;
      } catch (error: any) {
        this.err = error.message;
      }
    },
    async fetchProfile() {
      console.log('getting profile');
      try {
        this.err = null;
        const res = await apiClient.get('/users/profiles/me');
        this.profile = res.data.data;
        //localStorage.setItem('user', res.data.data);
        console.log(res.data.data);
        localStorage.setItem('userStore', JSON.stringify(this.$state));
        return this.user;
      } catch (error: any) {
        this.err = error.message;
      }
    },
    async signUp(user:JSON) {
      try {
        this.err = null;
        const res = await apiClient.post('/users/register', user);
        this.user = res.data.user;
        localStorage.setItem('userStore', JSON.stringify(this.$state));
        return this.user;
      } catch (error: any) {
        this.err = error.message;
      }
    },
    async signIn(credentials:JSON) {
      console.log('logging');
      this.err = null;
      const res = await apiClient.post('/users/login', credentials);
      this.user = res.data.data.user;
      return this.user;//await this.fetchUser();
    },
    async signOut() {
      console.log('logout', process.env);
      const res = await apiClient.post('/users/logout');
      console.log(res);
      if (!this.err) {
        this.user = null;
        this.token = null;
        this.profile = null;
        localStorage.removeItem('userStore');
        return true;
      }
      return false;
    },
    initialize() {
      const storedState = localStorage.getItem('userStore')
      if (storedState) {
        this.$patch(JSON.parse(storedState))
      }
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.user;
    }
  },
});
