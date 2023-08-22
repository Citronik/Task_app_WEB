import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';
import { Room } from '@/models/Room';

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: [] as Room[],
  }),
  actions: {
    async fetchRooms() : Promise<any> {
      console.log('getting rooms');
      try {
        const res = await apiClient.get('/rooms');
        this.rooms = res.data;
        return { res: this.rooms };
      } catch (error: any) {
        return {res: null, err: error.message};
      }
    },
  },
  getters: {
    getRooms() : Room[] {
      return this.rooms;
    },
  },

});
