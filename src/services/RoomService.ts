import apiClient from '@/store/modules/apiClient';
import { Room } from '@/models/Room';

class RoomService {
  async fetchRooms(): Promise<Room[]> {
    try {
    const res = await apiClient.get('rooms/');
    //console.log(res.data);
    if (!res.data ) {
      return null;
    }
    const rooms: Room[] = res.data.map((room: Room) => {
      return {
        id: room.id,
        creator_id: room.creator_id,
        room_name: room.room_name,
        room_table: room.room_table,
        description: room.description,
        photo_id: room.photo_id,
        created_at: room.created_at,
        updated_at: room.updated_at,
        room_photo: room.room_photo,
      }
    });
    return rooms;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async fetchRoom(roomId: Number): Promise<Room> {
    try {
    const res = await apiClient.get('rooms/' + roomId);
    //console.log(res.data);
    if (!res.data ) {
      return null;
    }
    const room: Room = {
      id: res.data.id,
      creator_id: res.data.creator_id,
      room_name: res.data.room_name,
      room_table: res.data.room_table,
      description: res.data.description,
      photo_id: res.data.photo_id,
      created_at: res.data.created_at,
      updated_at: res.data.updated_at,
      room_photo: res.data.room_photo,
    };
    return room;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async createRoom(room: Room): Promise<boolean> {
    try {
      const res = await apiClient.post('rooms', room);
      if (!res.data ) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async updateRoom(room: Room): Promise<boolean> {
    try {
      const res = await apiClient.put('rooms/' + room.id, room);
      if (!res.data ) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deleteRoom(room: Room): Promise<boolean> {
    try {
      const res = await apiClient.delete('rooms/' + room.id);
      if (!res.data ) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
export default new RoomService();
