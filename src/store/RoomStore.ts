import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: [],
  }),
  actions: {
    async fetchRooms() : Promise<any> {
      console.log('getting rooms');
      try {
        const res = await apiClient.get('/rooms');
        this.rooms = res.data.data;
        return this.rooms;
      } catch (error: any) {
        return {res: null, err: error.message};
      }
    },
  },
  getters: {

  },

});
