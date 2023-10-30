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
      return await apiClient.get('/rooms')
        .then(({ data }) => {
          this.rooms = data;
        })
        .catch(() => {
          console.error('fetch the rooms error: ');
        });
    },
    async fetchRoom(id: number) : Promise<Room> {
      console.log('getting room');
      try {
        const res = await apiClient.get(`/rooms/${id}`);
        return res.data;
      } catch (error: any) {
        return null;
      }
    },
    getRoom(id: number) : Room {
      return this.rooms.find(room => room.id === id);
    },
  },
  getters: {
    getRooms() : Room[] {
      return this.rooms;
    },
  },

});
