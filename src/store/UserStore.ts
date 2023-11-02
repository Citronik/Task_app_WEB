// /store/user.js
import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';
import { User } from '@/models/User';
import router from "@/router";
import UserService from "@/services/UserService";
//import UserService from "@/services/UserService";

export const useUserStore = defineStore("user", {
  state: () => ({
      user: null as User,
      profile: null,
      profilePicture: '/anonymous-avatar-icon-25.jpg',
      err: null,
      token: '',
  }),

  actions: {
    async fetchUser() : Promise<any> {
      console.log('getting user');

      return await apiClient.get('/users/me')
        .then(({ data }) => {
          console.log('fetchUser:', data)
          this.user = data.data;
        })
        .catch(({ data }) => {
          // add alert to alertStore
          console.error('fetchUser err: ', data);
        });
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
        // add alert to alertStore
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
          // add alert to alertStore
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
          // add alert to alertStore
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
          // add alert to alertStore
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
        console.log('sessionNotValid');
        // add alert to alertStore
        return false;
      }
      return await apiClient.get('/users/validate')
        .then(() => {
          console.log("session valid");
          return true;
        })
        .catch(({ headers, data }) => {
          console.log('invalid token')
          console.log(headers, data)
          this.clearStore();
          // add alert to alertStore
          return false;
        });
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
    async updateUser(user: User) : Promise<any> {
      console.log('updating user');
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        file: user.profile.avatar,
        bio: user.profile.bio,
      };
      return await apiClient.patch('/users/update', data)
        .then(({ data }) => {
          console.log('updateUser:', data)
          this.user = data.data;
        })
        .catch(({ data }) => {
          console.error('updateUser err: ', data);
          // add alert to alertStore
        });
    },
    async getUserFotoUrl() : Promise<any> {
      this.profilePicture = await UserService.getUserPhoto(this.user.id);
      this.user.avatar = this.profilePicture;
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
