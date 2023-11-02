import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';
import { Room } from '@/models/Room';
//import { useAlertStore } from "./AlertStore";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: [] as Room[],
    desiredRoom: {} as Room,
  }),
  actions: {
    async fetchRooms() : Promise<any> {
      console.log('getting rooms');
      return await apiClient.get('/rooms')
        .then(({ data }) => {
          console.log('fetchRooms data: ', data)
          this.rooms = data;
        })
        .catch(() => {
          console.error('fetchRooms error: ');
        });
    },
    async fetchRoom(id: number) : Promise<any> {
      console.log('getting room');
      return await apiClient.get(`/rooms/${id}`)
        .then(({ data }) => {
          this.desiredRoom = data;
          const existingItemIndex = this.rooms.findIndex((item) => item.id === this.desiredRoom.id);
          if (existingItemIndex !== -1) {
            this.rooms[existingItemIndex] = this.desiredRoom;
          } else {
            this.rooms.push(this.desiredRoom);
          }
          return this.desiredRoom;
        })
        .catch(() => {
          console.error('fetchRoom error: ');
        });
    },
    async createRoom(room: Room) : Promise<any> {
      console.log('creating room');
      return await apiClient.post('/rooms', room)
        .then(({ data }) => {
          this.desiredRoom = data;
        })
        .catch(() => {
          console.error('createRoom error: ');
        });
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
