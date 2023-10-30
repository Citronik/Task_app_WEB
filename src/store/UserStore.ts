// /store/user.js
import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';
import { User } from '@/models/User';
import router from "@/router";
//import UserService from "@/services/UserService";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null as User,
      profile: null,
      err: null,
      token: '',
    }
  },

  actions: {
    async fetchUser() : Promise<any> {
      console.log('getting user');

      try {
        const res = await apiClient.get('/users/me');
        console.log(res.data);
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
    async signUp(user: string) : Promise<any>{
      console.log('registering');
      this.err = null;
      return await apiClient.post('/users/register', user)
        .then(({ data }) =>{
          console.log(data)
          router.push({ name: 'Login'})
        })
        .catch(({ error }) =>{
          console.log(error)
          this.err = error.message;
        });
    },
    async signIn(credentials: { username: string; email: string; password: string }) : Promise<any> {
      console.log('logging');
      this.err = null;
      return await apiClient.post('/users/login', credentials)
        .then(({ data }) => {
          console.log('SUC res: ', data);
          this.user = data.user;
          this.token = data.token.token;
          //apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          router.push({ name: 'Home' });
        })
        .catch(({ error }) =>{
          console.error('error ocured during login: ', error);
          this.err = error;
        });
    },
    async signOut() : Promise<any> {
      console.log('logout');
      this.err = null;
      return await apiClient.post('/users/logout')
        .then(() =>{
          this.clearStore();
          router.push({name: 'Login'})
        })
        .catch(({error}) =>{
          console.log('LOGOGUT err: ', error);
        });
    },
    clearStore() {
      this.user = null;
      this.profile = null;
      this.token = '';
      localStorage.removeItem('userStore');
    },
    async isValidSession(): Promise<boolean> {
      if (!this.token){
        return false;
      }
      return true;
      // console.log(apiClient);
      // await apiClient.get('/users/validate')
      //   .then(() => {
      //     console.log("session valid");
      //     return true;
      //   })
      //   .catch(({ headers, data }) => {
      //     console.log('invalid token')
      //     console.log(headers, data)
      //     //this.clearStore();
      //     return false;
      //   });
    },
    async fetchUserByID(user_id: Number) : Promise<any> {
      console.log('getting user');

      try {
        const res = await apiClient.get('/users/' + user_id);
        this.user = res.data.data;
        return this.user;
      } catch (error: any) {
        this.err = error.message;
        return {res: null, err: error.message};
      }
    },
    async updateUser(user: User) : Promise<User> {
      console.log('updating user');
      try {
        const res = await apiClient.patch('/users/update', user);
        console.log(res);
        this.user = res.data.data;
        return this.user;
      } catch (error) {
        console.log(error);
        //?TO-DO add error to user store
        return null;
      }
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.token;
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['user', 'token'],
  },
});
