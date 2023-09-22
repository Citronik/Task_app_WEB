<template>
  <div class="chat-component">
    <div class="chat-component__header">
      <h2 class="chat-component__header__title">{{ room.room_name }}'s chat</h2>
    </div>
    <v-container class="chat-component__messages">
      <v-row v-for="message in messages" :key="message.id" :justify="message.user_id === userStore.user.id ? 'end' : 'start'">
        <v-col cols="6" align-self="end">
          <TheMessage
            :userId="message.user_id"
            :message="message.message"
            :sentDate="message.created_at"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="chat-component__input">
      <v-row justify="center" align="center">
        <v-col cols="10">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="8">
          <TheRoomMessageInput class="chat-component__input__field" v-model="testMessage"/>
        </v-col>
        <v-col cols="1">
          <TheRoomMessageButton class="chat-component__input__button" @click="sendMessage" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Message } from "@/models/Message";
import { Room } from "@/models/Room";
import { useMessageStore } from "@/store/MessageStore";
import { useRoomStore } from "@/store/RoomStore";
import UserService from "@/services/UserService";
import { useUserStore } from "@/store/UserStore";
import TheRoomMessageButton from "./TheRoomMessageButton.vue";
import TheRoomMessageInput from './TheRoomMessageInput.vue';
import TheMessage from './TheMessage.vue';
export default {
  name: "room-chat-card",
  components: {
    TheRoomMessageButton,
    TheRoomMessageInput,
    TheMessage,
  },
  setup() {
    const messageStore = useMessageStore();
    const roomStore = useRoomStore();
    const userStore = useUserStore();
    return { messageStore, roomStore, userStore, UserService };
  },
  data() {
    return {
      room: {} as Room,
      messages: [] as Message[],
      newMessage: {} as Message,
      testMessage: '',
    };
  },
  async mounted() {
      // Fetch messages on mount
      this.room = this.roomStore.getRoom(+this.$route.params.id);
      this.messages = await this.messageStore.fetchMessages(+this.$route.params.id);
      const messageContainer = document.querySelector('.chat-component__messages');
      messageContainer.scrollTop = messageContainer.scrollHeight;
  },
  watch: {
    '$route.params.id': {
      handler: async function (id: number) {
        this.messages = await this.messageStore.fetchMessages(id);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async sendMessage() {
      console.log('sending message')
      console.log(this.testMessage)
      this.newMessage.room_id = +this.$route.params.id;
      this.newMessage.message = this.testMessage;
      const res = await this.messageStore.createMessage(this.newMessage);
      if (res) {
        this.messages.push(this.newMessage);
        this.newMessage = {} as Message;
      }
    },
    async getUserProfileImageUrl(id: number): Promise<string> {
      const url = (await this.UserService.getUserPhoto(id)).toString();
      console.log(url);
      return url;
    },
  },
};
</script>

<style>
.chat-component {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.chat-component__header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}
.chat-component__header__title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
}
.chat-component__messages {
  max-height: 43rem;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px;
}
.chat-component__messages__message {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.chat-component__messages__message__content {
  display: flex;
  flex-direction: column;
}
.chat-component__messages__message__content__text {
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
.chat-component__messages__message__content__date {
  font-size: 12px;
  font-weight: 400;
  color: #999;
}
.chat-component__input {
  padding: 0 0 0 0 !important;
}
.chat-component__input__field {
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
.chat-component__input__button {
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  background-color: #fff;
  cursor: pointer;
}
</style>
