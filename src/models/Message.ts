export class Message
{
  id: number = 0;
  user_id: number = 0;
  room_id: number = 0;
  message: string = "";
  created_at: string = "";
  updated_at: string = "";

  constructor(data: Partial<Message> = {}) {
    Object.assign(this, data);
  }

}
