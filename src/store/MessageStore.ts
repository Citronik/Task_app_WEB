
import { defineStore } from "pinia";
import MessageService from "@/services/MessageService";
import { Message } from '@/models/Message';

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    async fetchMessages(roomId: Number): Promise<Message[]> {
      console.log('fetching message');
      const messages = await MessageService.fetchMessages(roomId);
      if (messages) {
        this.messages = messages;
        return messages;
      }
      return [];
    },
    async createMessage(message: Message): Promise<boolean> {
      console.log('sending message');
      const result = await MessageService.createMessage(message);
      return !result ? false : true;
    },
    async updateMessage(message: Message): Promise<boolean> {
      console.log('updating message');
      const result = await MessageService.updateMessage(message);
      return !result ? false : true;
    },
    async deleteMessage(message: Message): Promise<boolean> {
      console.log('deleting message');
      const result = await MessageService.deleteMessage(message);
      return !result ? false : true;
    },
  },
  getters: {
    getMessages(): Message[] {
      return this.messages;
    },
  },
});
