import apiClient from '@/store/modules/apiClient';
import { Message } from '@/models/Message';

class MessageService {
  async fetchMessages(roomId: Number): Promise<Message[]> {
    try {
    const res = await apiClient.get('rooms/'+ roomId + '/messages');
    //console.log(res.data);
    if (!res.data ) {
      return null;
    }
    const messages: Message[] = res.data.map((message: Message) => {
      return {
        id: message.id,
        message: message.message,
        user_id: message.user_id,
        room_id: message.room_id,
        created_at: message.created_at,
        updated_at: message.updated_at,
      }
    });
    return messages;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async createMessage(message: Message): Promise<Message> {
    try {
      const res = await apiClient.post('rooms/'+ message.room_id + '/messages', message);
      if (!res.data ) {
        return res.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateMessage(message: Message): Promise<Message> {
    try {
      const res = await apiClient.put('rooms/'+ message.room_id + '/messages/' + message.id, message);
      if (!res.data ) {
        return res.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteMessage(message: Message): Promise<Message> {
    try {
      const res = await apiClient.delete('rooms/'+ message.room_id + '/messages/' + message.id);
      if (!res.data ) {
        return res.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async fetchMessage(roomId: Number,  messageId: Number): Promise<Message> {
    try {
      const res = await apiClient.get('rooms/' + roomId + 'messages/' + messageId);
      if (!res.data ) {
        return null;
      }
      const message: Message = {
        id: res.data.id,
        message: res.data.message,
        user_id: res.data.user_id,
        room_id: res.data.room_id,
        created_at: res.data.created_at,
        updated_at: res.data.updated_at,
      }
      return message;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export default new MessageService();
