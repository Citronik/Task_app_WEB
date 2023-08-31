// /store/user.js
import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';
import { User } from '@/models/User';

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User,
    profile: null,
    err: null,
  }),

  actions: {
    async fetchUser() : Promise<any> {
      console.log('getting user');

      try {
        const res = await apiClient.get('/users/me');
        this.user = res.data.data;
        return this.user;
      } catch (error: any) {
        this.err = error.message;
        return {res: null, err: error.message};
      }
    },
    async fetchProfile() : Promise<any>{
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
        return {res: null, err: error.message};
      }
    },
    async signUp(user:JSON) : Promise<any>{
      try {
        this.err = null;
        const res = await apiClient.post('/users/register', user);
        this.user = res.data.user;
        localStorage.setItem('userStore', JSON.stringify(this.$state));
        return { res:  res.data.message, err: null, status: res.data.status};
      } catch (error: any) {
        this.err = error.message;
        console.log('err: ',  this.err);
        return {res: null, err: error.message};
      }
    },
    async signIn(credentials: { username: string; email: string; password: string }) : Promise<any> {
      console.log('logging');
      this.err = null;
      try {
        const res = await apiClient.post('/users/login', credentials);
        this.user = res.data.data;
        console.log('user: ', this.user);
        console.log('res: ', res);
        if (this.user) {  // if user is logged in
          localStorage.setItem('userStore', JSON.stringify(this.$state));
        }
        return {res: null, err: null, message: res.data.message, status: res.data.status};
      } catch (error: any) {
        this.err = error.message;
        console.log('err: ',  this.err);
        this.user = null;
        this.profile = null;
        localStorage.removeItem('userStore');
        return {res: null, err: this.err, message: this.err.message, status: "failed"};
      }
    },
    async signOut() : Promise<boolean> {
      console.log('logout');
      this.err = null;
      try {
        await apiClient.post('/users/logout');
        this.user = null;
        this.profile = null;
        localStorage.removeItem('userStore');
        return true;
      } catch (error: any) {
        this.err = error.message;
        console.log('err: ',  this.err);
        return false;
        }
    },
    async isValidSession(): Promise<boolean> {
      try {
        const res = await apiClient.get('/users/me');
        this.user = res.data.data;
        console.log('suc: ', res);
        return true;
      } catch (error: any) {
        if (error.response?.status === 401) {
          this.signOut();
          console.log('unauth: ', error.response);
          return false;
        } else {
          this.err = error.message;
          console.log('err: ', this.err);
          return false;
        }
      }
    },
    async initialize() {
      const storedState = localStorage.getItem('userStore')
      if (storedState && await this.isValidSession()) {
        this.$patch(JSON.parse(storedState))
      } else{
        this.user = null;
        this.profile = null;
        localStorage.removeItem('userStore');
      }
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.user;
    }
  },
});
