export class Room
{
  id: number = 0;
  creator_id: number = 0;
  room_name: string = "";
  room_table: string = "";
  description: string = "";
  photo_id: Number = 0;
  created_at: string = "";
  updated_at: string = "";
  room_photo: string = "";

  constructor(data: Partial<Room> = {}) {
    Object.assign(this, data);
  }

}
